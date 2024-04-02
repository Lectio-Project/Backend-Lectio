import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { QuerySearchCategoriesDto } from './dto/query-search-categories.dto';
import { QuerySearchGenresDto } from './dto/query-search-genres.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/categories')
  findAllCategories(@Query() queries: QuerySearchCategoriesDto) {
    if (Object.values(queries).every(value => !value)) {
      throw new BadRequestException('Preencha pelo menos um campo');
    }
    return this.searchService.findAllCategories(queries);
  }

  @Get('/genres')
  findAllGenres(@Query() query: QuerySearchGenresDto) {
    const { genresId } = query;
    const genresIdArray = typeof genresId === 'string' ? [genresId] : genresId;

    return this.searchService.findAllGenres(genresIdArray);
  }
}
