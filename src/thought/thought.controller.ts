import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateThoughtDto } from './dto/create-thought.dto';
import { UpdateThoughtDto } from './dto/update-thought.dto';
import { ThoughtService } from './thought.service';

@UseGuards(AuthGuard)
@Controller('thought')
@ApiTags('Thought')
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
