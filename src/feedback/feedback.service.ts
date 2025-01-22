import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Feedback } from './feedback';
import { CreateFeedbackDto } from './feedback.dto';
import { UpdateFeedbackDto } from './feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(@InjectModel(Feedback) private feedbackModel: typeof Feedback) {}

  // Create new feedback
  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackModel.create(createFeedbackDto);
  }

  // Retrieve all feedback
  async findAll() {
    return this.feedbackModel.findAll();
  }

  // Retrieve a single feedback by ID
  async findOne(id: number) {
    const feedback = await this.feedbackModel.findByPk(id);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    return feedback;
  }

  // Update a feedback entry
  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    return feedback.update(updateFeedbackDto);
  }

  // Delete a feedback entry
  async remove(id: number) {
    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    await feedback.destroy();
    return { message: 'Feedback deleted successfully' };
  }
}
