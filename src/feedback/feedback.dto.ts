import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateFeedbackDto {
    @IsString()
    title?: string;
  
    @IsString()
    email?: string;
  
    @IsString()
    message?: string;
  }
  

