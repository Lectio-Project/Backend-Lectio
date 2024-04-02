import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/authUser/authUser.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseGuards(AuthGuard)
@Controller('comments')
@ApiTags('Comments')
@ApiSecurity('JWT-auth')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user.id, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    if (!updateCommentDto.bookGrade && !updateCommentDto.text) {
      throw new BadRequestException(
        'Preencha pelo menos um campo: text ou bookGrade',
      );
    }
    return this.commentsService.update(req.user.id, id, updateCommentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.commentsService.remove(id, req.user.id);
  }
}
