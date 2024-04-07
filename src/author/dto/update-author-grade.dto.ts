import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UpdateAuthorDto } from './update-author.dto';

export class UpdateAuthorGradeDto extends PickType(UpdateAuthorDto, ['grade']) {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Grade não pode ser vazio' })
  grade: string;
}
