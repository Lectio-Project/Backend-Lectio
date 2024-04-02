import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/authUser/authUser.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';

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
  findAll(@Query() pagination: PaginationDto) {
    return this.commentsService.findAll(
      pagination.page,
      pagination.quantityPerPage,
    );
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
    return this.commentsService.update(req.user.id, id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.commentsService.remove(id, req.user.id);
  }
}
