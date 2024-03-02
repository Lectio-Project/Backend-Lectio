import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfStringsOrString } from 'src/utils/validators/IsArrayOfStringsOrString';
import { IsCompletelyName } from 'src/utils/validators/IsCompletelyName';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @IsCompletelyName()
  name: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  carrerDescription: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  birthplace: string;

  @IsArrayOfStringsOrString()
  genres: any;
}
