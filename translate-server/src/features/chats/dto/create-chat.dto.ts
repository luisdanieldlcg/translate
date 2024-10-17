import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  initialMessage: string;
  @IsNumber()
  @IsNotEmpty()
  owner_id: number;
  targetLanguage: string;
}
