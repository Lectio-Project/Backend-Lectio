import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/authAdmin/authAdmin.guard';
import { IsValidImageFile } from 'src/utils/validators/IsValidImageFile';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiTags('Admin/Books')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
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
    createBookDto.authorId =
      typeof authorId === 'string' ? [authorId] : authorId;

    return this.bookService.create(createBookDto, image);
  }

  @ApiTags('Books')
  @Get()
  findAll(@Query() query: QueryBookDto, @Query() pagination: PaginationDto) {
    const { add, ...rest } = query;
    const addArray = typeof add === 'string' ? [add] : add;
    return this.bookService.findAll(
      addArray,
      rest,
      pagination.page,
      pagination.quantityPerPage,
    );
  }

  @ApiTags('Books')
  @Get(':id')
  findOne(@Query() query: QueryBookDto, @Param('id') id: string) {
    const { add } = query;
    const addArray = typeof add === 'string' ? [add] : add;
    return this.bookService.findOne(id, addArray);
  }

  @ApiTags('Admin/Books')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
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
    updateBookDto.authorId =
      typeof authorId === 'string' ? [authorId] : authorId;
    return this.bookService.update(id, updateBookDto, image);
  }

  @ApiTags('Admin/Books')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
