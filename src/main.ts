import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;
  const config = new DocumentBuilder()
    .setTitle('NestJS education')
    .setDescription('Documentation for my REST API')
    .setVersion('1.0.0')
    .addTag('NEST')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://portfolio-baitemirasanbaevs-projects.vercel.app/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(PORT, () => {
    console.log('started at port: ' + PORT);
  });
}
start();
