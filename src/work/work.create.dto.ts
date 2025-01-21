import { IsArray, IsString } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  title: string;

  @IsString()
  site_url: string;

  @IsString()
  code_url: string;

  @IsString()
  brief: string;

  @IsString()
  full: string;

  @IsArray()
  images: string[]; 
  
  @IsArray()
  stack_info: string[];  // List of stack descriptions (paragraphs)

  @IsArray()
  stack_ids: number[];  // List of stack IDs to associate with the work
}
