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
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  @MaxLength(500)
  synopsis: string;

  @IsString()
  @IsNotEmpty()
  publishingCompany: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsValidYear()
  publishYear: string;

  @IsNotEmpty()
  @IsArrayOfIdStringsOrIdString()
  genderId: string;

  @IsNotEmpty()
  @IsArrayOfIdStringsOrIdString()
  authorId: string | Array<string>;
}
