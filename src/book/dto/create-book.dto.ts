import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfStringsOrString } from 'src/utils/validators/IsArrayOfStringsOrString';
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
  @IsArrayOfStringsOrString()
  genderId: string;

  @IsNotEmpty()
  @IsArrayOfStringsOrString()
  authorId: string | Array<string>;
}
