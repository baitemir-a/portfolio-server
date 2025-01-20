import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { StackService } from './stack.service';
  import { CreateStackDto } from './dto';
  import { UpdateStackDto } from './dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { Express } from 'express';
  
  @Controller('stack')
  export class StackController {
    constructor(private readonly stackService: StackService) {}
  
    @Post()
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './src/media', // Save images in the 'media' folder
          filename: (req, file, callback) => {
            const filename = `${Date.now()}${extname(file.originalname)}`;
            callback(null, filename); // Use timestamp for unique file names
          },
        }),
      }),
    )
    async create(
      @Body() createStackDto: CreateStackDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (file) {
        createStackDto.image = `media/${file.filename}`; // Path to save in DB (relative to public folder)
      }
      return this.stackService.create(createStackDto);
    }
  
    @Get()
    async findAll() {
      return this.stackService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.stackService.findOne(id);
    }
  
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateStackDto: UpdateStackDto,
    ) {
      return this.stackService.update(id, updateStackDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return this.stackService.remove(id);
    }
  }
  