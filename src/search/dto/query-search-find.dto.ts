import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class QuerySearchFindDto {
  @ApiProperty({ required: true, example: 'vento' })
  @IsNotEmpty({ message: 'o array de find é requerido' })
  @IsString({ message: 'o array de find deve ser uma string' })
  @MaxLength(255, {
    message: 'o array de find deve ter no maximo 255 caracteres',
  })
  find: string;
}
