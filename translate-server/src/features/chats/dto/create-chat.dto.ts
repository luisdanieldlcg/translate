import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  initialMessage: string;
  targetLanguage: string;
}
