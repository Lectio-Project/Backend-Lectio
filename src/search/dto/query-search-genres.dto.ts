import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';

export class QuerySearchGenresDto {
  @ApiProperty({
    required: true,
    type: [String],
    example: ['5f8a7f0d8d4b0c2b9c1b9c1a'],
  })
  @IsNotEmpty({ message: 'o array de genresId é requerido' })
  @IsArrayOfIdStringsOrIdString({
    message: 'o array de genresId deve conter apenas ids do tipo ObjectId',
  })
  genresId: string | Array<string>;
}
