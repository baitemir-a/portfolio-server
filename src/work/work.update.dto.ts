import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateWorkDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  site_url?: string;

  @IsOptional()
  @IsString()
  code_url?: string;

  @IsOptional()
  @IsString()
  brief?: string;

  @IsOptional()
  @IsString()
  full?: string;

  @IsArray()
  images?: string[]; 

  @IsOptional()
  @IsArray()
  stack_info?: string[];  // List of stack descriptions (optional)

  @IsOptional()
  @IsArray()
  stack_ids?: number[];  // List of stack IDs to associate with the work (optional)
}
