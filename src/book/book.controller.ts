import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsValidImageFile } from 'src/utils/validators/IsValidImageFile';
import { BookService } from './book.service';
import { CreateBookServiceDto } from './dto/creat-book-service.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookServiceDto } from './dto/update-book-service.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new IsValidImageFile({
            mimetypes: ['image/jpeg', 'image/png', 'image/jpg'],
          }),
        ],
        errorHttpStatusCode: 400,
      }),
    )
    image?: Express.Multer.File,
  ) {
    const { authorId } = createBookDto;

    const createBookServiceDto: CreateBookServiceDto = {
      ...createBookDto,
      authorIds: Array.isArray(authorId) ? authorId : [authorId],
    };

    return this.bookService.create(createBookServiceDto, image);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new IsValidImageFile({
            mimetypes: ['image/jpeg', 'image/png', 'image/jpg'],
          }),
        ],
        errorHttpStatusCode: 400,
      }),
    )
    image?: Express.Multer.File,
  ) {
    const { authorId } = updateBookDto;

    const updateBookServiceDto: UpdateBookServiceDto = {
      ...updateBookDto,
      authorIds: typeof authorId === 'string' ? [authorId] : authorId,
      grade: Number(updateBookDto.grade),
    };
    return this.bookService.update(id, updateBookServiceDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
