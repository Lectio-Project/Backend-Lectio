import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotDigitAndSpecialChar } from 'src/utils/validators/IsNotDigitAndSpecialChar';

export class CreateThoughtDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotDigitAndSpecialChar()
  phrase: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bookId: string;
}
