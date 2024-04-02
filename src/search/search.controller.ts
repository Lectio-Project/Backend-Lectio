import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { QuerySearchCategoriesDto } from './dto/query-search-categories.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  findAllCategories(@Query() queries: QuerySearchCategoriesDto) {
    if (Object.values(queries).every(value => !value)) {
      throw new BadRequestException('Preencha pelo menos um campo');
    }
    return this.searchService.findAllCategories(queries);
  }
}
