import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/authUser/authUser.guard';
import { QuerySearchCategoriesDto } from './dto/query-search-categories.dto';
import { QuerySearchFindDto } from './dto/query-search-find.dto';
import { QuerySearchGenresDto } from './dto/query-search-genres.dto';
import { SearchService } from './search.service';

@Controller('search')
@ApiTags('Search')
@ApiSecurity('JWT-auth')
@UseGuards(AuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  findAll(@Query() queries: QuerySearchFindDto) {
    return this.searchService.findAll(queries.find);
  }

  @Get('/categories')
  findAllCategories(@Query() queries: QuerySearchCategoriesDto) {
    if (Object.values(queries).every(value => !value)) {
      throw new BadRequestException('Preencha pelo menos um campo');
    }
    return this.searchService.findAllCategories(queries);
  }

  @Get('/genres')
  findAllGenres(@Query() queries: QuerySearchGenresDto) {
    const { genresId } = queries;
    const genresIdArray = typeof genresId === 'string' ? [genresId] : genresId;

    return this.searchService.findAllGenres(genresIdArray);
  }
}
