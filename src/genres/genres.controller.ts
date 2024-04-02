import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/authAdmin/authAdmin.guard';
import { AuthGuard } from 'src/guards/authUser/authUser.guard';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenresService } from './genres.service';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiTags('Admin/Genres')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @ApiTags('Genres')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.genresService.findAll(
      pagination.page,
      pagination.quantityPerPage,
    );
  }

  @ApiTags('Genres')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @ApiTags('Admin/Genres')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @ApiTags('Admin/Genres')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
