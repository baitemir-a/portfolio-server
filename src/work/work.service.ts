import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Work } from './work';
import { CreateWorkDto } from './work.create.dto';
import { UpdateWorkDto } from './work.update.dto';
import { Stack } from 'src/stack/stack';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work) private workModel: typeof Work,
    @InjectModel(Stack) private stackModel: typeof Stack,
  ) {}

  // Create a new work with stack_info (descriptions) and images
  async create(createWorkDto: CreateWorkDto) {
    const { stack_info, stack_ids, images, ...workData } = createWorkDto;

    // Create the new work record
    const work = await this.workModel.create(workData);

    // Save stack_info (descriptions) directly in the Work record
    if (stack_info && stack_info.length > 0) {
      work.stack_info = stack_info;

    }

    // Save images in the Work record
    if (images && images.length > 0) {
      work.images = images;
    }

    // Associate the stack based on stack_ids
    if (stack_ids && stack_ids.length > 0) {
      const stack = await this.stackModel.findAll({
        where: {
          id: stack_ids,
        },
      });

      // Use $set to automatically create records in WorkStack and associate the stack
      await work.$set('stack', stack);
      await work.save();
    }

    return work;
  }

  async findAll() {
    return this.workModel.findAll({
      include: [Stack],
    });
  }

  async findOne(id: number) {
    return this.workModel.findByPk(id, {
      include: [Stack],
    });
  }
  async update(id: number, updateWorkDto: UpdateWorkDto) {
    const work = await this.findOne(id);
    if (!work) {
      throw new Error('Work not found');
    }
  
    const { stack_info, stack_ids, images, ...workData } = updateWorkDto;
  
    // Update work data
    await work.update(workData);
  
    // Update stack_info (descriptions) if provided
    if (stack_info && stack_info.length > 0) {
      work.stack_info = stack_info;
      await work.save();
    }
  
    // Update images if provided
    if (images && images.length > 0) {
      // Optional: Remove old images from the filesystem
      if (work.images && work.images.length > 0) {
        work.images.forEach(oldImage => {
          const oldPath = join(process.cwd(), 'src', oldImage);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        });
      }
      work.images = images;
      await work.save();
    }
  
    // Update stack associations if stack_ids are provided
    if (stack_ids && stack_ids.length > 0) {
      const stack = await this.stackModel.findAll({
        where: {
          id: stack_ids,
        },
      });
      await work.$set('stack', stack); // Update associations
      await work.save();
    }
    const new_work = await this.findOne(id);
    return new_work;
  }
  

  async remove(id: number) {
    const work = await this.findOne(id);
    if (!work) {
      throw new Error('Work not found');
    }
    await work.destroy();
    return { message: 'Work deleted successfully' };
  }
}
