import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  bookGrade: number;

  @ApiProperty()
  @IsArrayOfIdStringsOrIdString()
  bookId: string;
}
