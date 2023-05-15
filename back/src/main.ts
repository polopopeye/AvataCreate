import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // increase timeout for large files
  app.use((req, res, next) => {
    req.setTimeout(300000);
    res.setTimeout(300000);
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Backend || AvataCreate')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
    },
  });

  app.use(json({ limit: '5000mb' }));
  app.use(urlencoded({ extended: true, limit: '5000mb' }));

  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
