import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stack } from 'src/stack/stack';
import { Work } from './work';

@Module({
  controllers: [WorkController],
  providers: [WorkService],
  imports: [
    SequelizeModule.forFeature([Stack, Work]),
  ],
})
export class WorkModule {}
