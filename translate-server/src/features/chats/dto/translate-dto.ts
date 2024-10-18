import { IsNotEmpty } from 'class-validator';

export class TranslateDto {
  // @IsNotEmpty()
  // from: string;
  @IsNotEmpty()
  to: string;
  @IsNotEmpty()
  message: string;
}
