import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WorkModule } from './work/work.module';
import { StackModule } from './stack/stack.module';
import { WorkStackModule } from './work-stack/work-stack.module';
import * as path from 'path';
import { Work } from './work/work';
import { Stack } from './stack/stack';
import { WorkStack } from './work-stack/work-stack';
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from './feedback/feedback';


@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      protocol: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Work, Stack, WorkStack, Feedback],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'src', 'media'),
      serveRoot: '/media',
    }),
    WorkModule,
    StackModule,
    WorkStackModule,
    FeedbackModule,
  ]
})
export class AppModule {}
