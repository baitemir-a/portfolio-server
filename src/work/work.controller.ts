import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './work.create.dto';
import { UpdateWorkDto } from './work.update.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {  // Handling multiple files
      storage: diskStorage({
        destination: './src/media',  // Set the directory to store the files
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(@Body() createWorkDto: CreateWorkDto, @UploadedFiles() files: Express.Multer.File[]) {
    // Save image paths in the database
    if (files && files.length > 0) {
      createWorkDto.images = files.map(file => `media/${file.filename}`);
    }
    return this.workService.create(createWorkDto);
  }

  @Get()
  async findAll() {
    return this.workService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {  // Handle multiple files
      storage: diskStorage({
        destination: './src/media',  // Directory to store files
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkDto: UpdateWorkDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Save new image paths in the update DTO
    if (files && files.length > 0) {
      updateWorkDto.images = files.map(file => `media/${file.filename}`);
    }
  
    return this.workService.update(id, updateWorkDto);
  }
  

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.workService.remove(id);
  }
}
