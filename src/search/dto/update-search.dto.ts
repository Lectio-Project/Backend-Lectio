import { PartialType } from '@nestjs/swagger';
import { QuerySearchCategoriesDto } from './query-search-categories.dto';

export class UpdateSearchDto extends PartialType(QuerySearchCategoriesDto) {}
