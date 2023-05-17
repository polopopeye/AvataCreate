import { faker } from '@faker-js/faker';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import * as request from 'supertest';
import { AuthModule } from '../../auth/auth.module';
import { AvatarModule } from '../../avatar/avatar.module';
import { UserDto } from '../dto/user.dto';
import { UserDocument, UserSchema } from '../schemas/user.schema';
import { UserModule } from '../user.module';

describe('User Controller', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<UserDocument> | any;
  //   let userService: UserService;
  let app: any;

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
      providers: [{ provide: getModelToken('user'), useValue: userModel }],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
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

  it('App should be defined', () => {
    expect(app).toBeDefined();
  });

  it(`POST user/create `, async () => {
    const userDto: UserDto = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      coverImg: faker.image.url(),
      displayName: faker.person.fullName(),
      language: 'en',
    };

    const result = await request(app.getHttpServer())
      .post('/user/create')
      .send(userDto)
      .expect(201);
  });
});
