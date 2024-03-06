import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsIncludedInOptions } from 'src/utils/validators/IsIncludedInOptions';

export class QueryAuthorDto {
  @ApiProperty({
    type: () => [String],
    required: false,
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  genresId?: string | Array<string>;

  @ApiProperty({
    type: () => [String],
    enum: ['book', 'gender', 'user'],
    required: false,
  })
  @IsOptional()
  @IsIncludedInOptions(['book', 'gender', 'user'])
  add?: string | Array<string>;
}
