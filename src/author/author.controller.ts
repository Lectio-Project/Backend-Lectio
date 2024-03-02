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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsValidImageFile } from 'src/utils/validators/IsValidImageFile';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createAuthorDto: CreateAuthorDto,
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
    const { genres } = createAuthorDto;
    createAuthorDto.genres = typeof genres === 'string' ? [genres] : genres;
    return this.authorService.create(createAuthorDto, image);
  }

  @Get()
  findAll(@Query('genres') genres: string | Array<string>) {
    const genresArray = typeof genres === 'string' ? [genres] : genres;
    console.log(genresArray);

    return this.authorService.findAll(genresArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
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
    const { genres } = updateAuthorDto;
    updateAuthorDto.genres = typeof genres === 'string' ? [genres] : genres;
    return this.authorService.update(id, updateAuthorDto, image);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
