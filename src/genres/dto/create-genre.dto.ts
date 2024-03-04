import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotDigitAndSpecialChar } from 'src/utils/validators/IsNotDigitAndSpecialChar';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @IsNotDigitAndSpecialChar()
  gender: string;
}
