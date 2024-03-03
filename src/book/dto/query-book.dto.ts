import { IsOptional } from 'class-validator';
import { IsIncludedInOptions } from 'src/utils/validators/IsIncludedInOptions';

export class QueryBookDto {
  @IsOptional()
  @IsIncludedInOptions(['author', 'gender', 'user', 'thought', 'comment'])
  add?: string | Array<string>;

  @IsOptional()
  filters?: string | Array<string>;
}
