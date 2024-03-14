import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @ApiProperty({
    type: () => [String],
    example: ['user id'],
    required: false,
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do usuário deve conter uma string ou um array de strings no formato ObjectId',
  })
  usersId?: string | Array<string>;

  @ApiProperty({
    required: false,
  })
  name?: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty({ required: false })
  carrerDescription?: string;

  @ApiProperty({ required: false })
  birthplace?: string;

  @ApiProperty({
    type: () => [String],
    example: ['id do gênero'],
    required: false,
  })
  genresId?: string | Array<string>;
}
