import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Stack } from './stack';
import { CreateStackDto } from './dto'; 
import { UpdateStackDto } from './dto';

@Injectable()
export class StackService {
  constructor(@InjectModel(Stack) private readonly stackModel: typeof Stack) {}

  // Create a new stack
  async create(createStackDto: CreateStackDto): Promise<Stack> {
    return this.stackModel.create(createStackDto);
  }

  // Find all stacks
  async findAll(): Promise<Stack[]> {
    return this.stackModel.findAll({ include: { all: true } }); // Include relationships
  }

  // Find a specific stack by ID
  async findOne(id: number): Promise<Stack> {
    const stack = await this.stackModel.findByPk(id, { include: { all: true } });
    if (!stack) {
      throw new NotFoundException(`Stack with ID ${id} not found`);
    }
    return stack;
  }

  // Update a stack by ID
  async update(id: number, updateStackDto: UpdateStackDto): Promise<Stack> {
    const stack = await this.findOne(id);
    return stack.update(updateStackDto);
  }

  // Delete a stack by ID
  async remove(id: number): Promise<void> {
    const stack = await this.findOne(id);
    await stack.destroy();
  }
}
