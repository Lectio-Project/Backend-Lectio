import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotDigitAndSpecialChar } from 'src/utils/validators/IsNotDigitAndSpecialChar';

export class CreateThoughtDto {
  @IsString()
  @IsNotEmpty()
  @IsNotDigitAndSpecialChar()
  phrase: string;

  @IsString()
  @IsNotEmpty()
  bookId: string;
}
