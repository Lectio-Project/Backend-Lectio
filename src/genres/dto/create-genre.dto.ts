import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotDigitAndSpecialChar } from 'src/utils/validators/IsNotDigitAndSpecialChar';

export class CreateGenreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotDigitAndSpecialChar()
  gender: string;
}
