import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { UserDocument, UserSchema } from '../schemas/user.schema';
import { UserService } from './user.service';
import { UserModule } from '../user.module';
import { AuthModule } from '../../auth/auth.module';
import { AvatarModule } from '../../avatar/avatar.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserDto } from '../dto/user.dto';
import { faker } from '@faker-js/faker';

describe('User Service', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<UserDocument> | any;
  let userService: UserService;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model('user', UserSchema);
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => ({
            uri: config.get<string>('MONGO_URI'),
          }),
        }),

        AuthModule,
        UserModule,
        AvatarModule,
      ],
      providers: [
        { provide: getModelToken('user'), useValue: userModel },
        UserService,
      ],
    }).compile();

    userService = testingModule.get<UserService>(UserService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const newUser: UserDto = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      coverImg: faker.image.url(),
      displayName: faker.person.fullName(),
      language: 'en',
    };

    const createNewUser = await userService.createNewUser(newUser);

    expect(createNewUser).toBeDefined();
    expect(createNewUser).toHaveProperty('id');
    expect(createNewUser).toHaveProperty('email');
    expect(createNewUser).toHaveProperty('coverImg');
    expect(createNewUser).toHaveProperty('displayName');
    expect(createNewUser).toHaveProperty('language');
    expect(createNewUser).toHaveProperty('bodyId');
    expect(createNewUser).toHaveProperty('headId');
    expect(createNewUser).toHaveProperty('avatarId');
    expect(createNewUser).toHaveProperty('token');
  });

  it('should find a user by id', async () => {
    const newUser: UserDto = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      coverImg: faker.image.url(),
      displayName: faker.person.fullName(),
      language: 'en',
    };

    const createNewUser = await userService.createNewUser(newUser);

    const findUserById = await userService.findUserById(
      createNewUser.id,
      createNewUser.email,
    );

    expect(findUserById).toBeDefined();
    expect(findUserById).toHaveProperty('id');
    expect(findUserById).toHaveProperty('email');
    expect(findUserById?.email).toEqual(createNewUser.email);

    const findUserById2 = await userService.findUserById(createNewUser.id);

    expect(findUserById2).toBeDefined();
    expect(findUserById2).toHaveProperty('id');
    expect(findUserById2).toHaveProperty('email');
    expect(findUserById2?.email).toEqual(createNewUser.email);
  });

  //   it('should not create user if wrong params', async () => {
  //     const newUser: UserDto = {
  //       coverImg: faker.image.url(),
  //       displayName: faker.person.fullName(),
  //       language: 'en',
  //     } as any;

  //     const response = await userService.createNewUser(newUser).catch((e) => {
  //       expect(e).toBeDefined();
  //       expect(e).toHaveProperty('message');
  //       expect(e.message).toEqual(
  //         'user validation failed: email: Path `email` is required., id: Path `id` is required.',
  //       );
  //     });

  //     expect(response).toBeUndefined();
  //   });
});
