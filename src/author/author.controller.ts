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
import { QueryAuthorDto } from './dto/query-author.dto';
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
    const { genresId } = createAuthorDto;
    createAuthorDto.genresId =
      typeof genresId === 'string' ? [genresId] : genresId;
    return this.authorService.create(createAuthorDto, image);
  }

  @Get()
  findAll(@Query() query: QueryAuthorDto) {
    const { add, genresId } = query;

    const genresArray = typeof genresId === 'string' ? [genresId] : genresId;
    const addArray = typeof add === 'string' ? [add] : add;

    return this.authorService.findAll(genresArray, addArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: QueryAuthorDto) {
    const { add } = query;
    const addArray = typeof add === 'string' ? [add] : add;
    return this.authorService.findOne(id, addArray);
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
    const { genresId, usersId } = updateAuthorDto;
    updateAuthorDto.genresId =
      typeof genresId === 'string' ? [genresId] : genresId;
    updateAuthorDto.usersId = typeof usersId === 'string' ? [usersId] : usersId;
    return this.authorService.update(id, updateAuthorDto, image);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
