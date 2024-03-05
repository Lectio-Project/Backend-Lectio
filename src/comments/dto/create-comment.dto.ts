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
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  bookGrade: number;

  @IsArrayOfIdStringsOrIdString()
  bookId: string;
}
