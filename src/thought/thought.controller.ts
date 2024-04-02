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
import { AuthGuard } from 'src/guards/authUser/authUser.guard';
import { CreateThoughtDto } from './dto/create-thought.dto';
import { UpdateThoughtDto } from './dto/update-thought.dto';
import { ThoughtService } from './thought.service';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';

@UseGuards(AuthGuard)
@Controller('thought')
@ApiTags('Thought')
@ApiSecurity('JWT-auth')
export class ThoughtController {
  constructor(private readonly thoughtService: ThoughtService) {}

  @Post()
  create(@Body() createThoughtDto: CreateThoughtDto) {
    return this.thoughtService.create(createThoughtDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.thoughtService.findAll(
      pagination.page,
      pagination.quantityPerPage,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thoughtService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThoughtDto: UpdateThoughtDto) {
    return this.thoughtService.update(id, updateThoughtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thoughtService.remove(id);
  }
}
