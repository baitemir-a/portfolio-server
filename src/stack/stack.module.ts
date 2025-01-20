import { Module } from '@nestjs/common';
import { StackController } from './stack.controller';
import { StackService } from './stack.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stack } from './stack';
import { Work } from 'src/work/work';

@Module({
  controllers: [StackController],
  providers: [StackService],
  imports: [
    SequelizeModule.forFeature([Stack, Work]),
  ],
})
export class StackModule {}
