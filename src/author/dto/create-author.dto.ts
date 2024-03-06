import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsCompletelyName } from 'src/utils/validators/IsCompletelyName';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCompletelyName()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  carrerDescription: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  birthplace: string;

  @ApiProperty({
    type: () => [String],
  })
  @IsArrayOfIdStringsOrIdString()
  @IsNotEmpty()
  genresId: string | Array<string>;
}
