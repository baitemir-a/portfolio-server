import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feedback } from './feedback';

@Module({
  imports: [SequelizeModule.forFeature([Feedback])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
