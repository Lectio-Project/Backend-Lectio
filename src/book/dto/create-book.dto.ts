import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsValidYear } from 'src/utils/validators/IsValidYear';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  @MaxLength(500)
  synopsis: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  publishingCompany: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  @IsValidYear()
  publishYear: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArrayOfIdStringsOrIdString()
  genderId: string;

  @ApiProperty({
    type: () => [String],
  })
  @IsNotEmpty()
  @IsArrayOfIdStringsOrIdString()
  authorId: string | Array<string>;
}
