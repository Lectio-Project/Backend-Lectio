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
import { AuthGuard } from 'src/guards/authUser/authUser.guard';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { IsValidImageFile } from 'src/utils/validators/IsValidImageFile';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryAuthorDto } from './dto/query-author.dto';
import { UpdateAuthorGradeDto } from './dto/update-author-grade.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiTags('Admin/Authors')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
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

  @ApiTags('Authors')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: QueryAuthorDto, @Query() pagination: PaginationDto) {
    const { add, genresId } = query;

    const genresArray = typeof genresId === 'string' ? [genresId] : genresId;
    const addArray = typeof add === 'string' ? [add] : add;

    return this.authorService.findAll(
      genresArray,
      addArray,
      pagination.page,
      pagination.quantityPerPage,
    );
  }

  @ApiTags('Authors')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: QueryAuthorDto) {
    const { add } = query;
    const addArray = typeof add === 'string' ? [add] : add;
    return this.authorService.findOne(id, addArray);
  }

  @ApiTags('Admin/Authors')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
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

  @ApiTags('Authors')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Patch('avaliation/:id')
  updateGrade(
    @Param('id') id: string,
    @Body() updateAuthorGradeDto: UpdateAuthorGradeDto,
  ) {
    return this.authorService.updateGrade(id, updateAuthorGradeDto);
  }

  @ApiTags('Admin/Authors')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
