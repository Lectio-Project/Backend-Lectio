import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export class QuerySearchCategoriesDto {
  @ApiProperty({ required: false })
  @Type(() => Boolean)
  @IsOptional()
  isMovie?: boolean = false;

  @ApiProperty({ required: false, enum: ['male', 'woman'] })
  @IsIn(['male', 'woman'], {
    message: 'O campo sexGenderAuthor deve ser uma string ex: male ou woman',
  })
  @IsOptional()
  sexGenderAuthor?: 'male' | 'women';

  @ApiProperty({ required: false })
  @Type(() => Boolean)
  @IsOptional()
  literaryAwards?: boolean = false;

  @ApiProperty({ required: false })
  @Type(() => Boolean)
  @IsOptional()
  weekPopulater?: boolean = false;

  @ApiProperty({ required: false })
  @Type(() => Boolean)
  @IsOptional()
  bestRated?: boolean = false;
}
