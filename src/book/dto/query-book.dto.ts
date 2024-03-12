import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsIncludedInOptions } from 'src/utils/validators/IsIncludedInOptions';

export class QueryBookDto {
  @ApiProperty({
    required: false,
    enum: ['user', 'thought', 'comment'],
  })
  @IsOptional()
  @IsIncludedInOptions(['user', 'thought', 'comment'])
  add?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by author id or [authors id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  authorId?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by gender id or [genres id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  genderId?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by user id or [users id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  userId?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by comment id or [comments id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  commentId?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by thought id or [thoughts id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  thoughtId?: string | Array<string>;
}
