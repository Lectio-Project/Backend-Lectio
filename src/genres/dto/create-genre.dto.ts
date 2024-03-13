import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotDigitAndSpecialChar } from 'src/utils/validators/IsNotDigitAndSpecialChar';

export class CreateGenreDto {
  @ApiProperty()
  @IsString({ message: 'O campo gênero deve ser uma string' })
  @IsNotEmpty({ message: 'O campo gênero é obrigatório' })
  @IsNotDigitAndSpecialChar({
    message: 'O campo gênero não deve ter dígitos ou caracteres especiais',
  })
  gender: string;
}
