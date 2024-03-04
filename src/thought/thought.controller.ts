import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ThoughtService } from './thought.service';
import { CreateThoughtDto } from './dto/create-thought.dto';
import { UpdateThoughtDto } from './dto/update-thought.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('thought')
export class ThoughtController {
  constructor(private readonly thoughtService: ThoughtService) {}

  @Post()
  create(@Body() createThoughtDto: CreateThoughtDto) {
    return this.thoughtService.create(createThoughtDto);
  }

  @Get()
  findAll() {
    return this.thoughtService.findAll();
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
