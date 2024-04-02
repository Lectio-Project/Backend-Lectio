import { IsNotEmpty } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';

export class QuerySearchGenresDto {
  @IsNotEmpty({ message: 'o array de genresId é requerido' })
  @IsArrayOfIdStringsOrIdString({
    message: 'o array de genresId deve conter apenas ids do tipo ObjectId',
  })
  genresId: string | Array<string>;
}
