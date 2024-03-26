import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AdminGuard } from 'src/guards/authAdmin/authAdmin.guard';
import { AuthGuard } from 'src/guards/authUser/authUser.guard';
import { IsValidImageFile } from 'src/utils/validators/IsValidImageFile';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(FileInterceptor('image'))
  @ApiTags('Users')
  @Post('sign-up')
  create(
    @Body() createUserDto: CreateUserDto,
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
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('As senhas devem ser iguais');
    }
    return this.usersService.create(image, createUserDto);
  }

  @ApiTags('Users')
  @Post('sign-in')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @ApiTags('Users')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiTags('Users')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return this.usersService.findOne(req.user.id);
  }

  @ApiTags('Users')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiTags('Users')
  @UseInterceptors(FileInterceptor('image'))
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Patch()
  update(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
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
    if (updateUserDto.password !== updateUserDto.confirmPassword) {
      throw new BadRequestException('As senhas devem ser iguais');
    }
    // const { authorsId } = updateUserDto;

    // updateUserDto.authorsId =
    //   authorsId && typeof authorsId === 'string'
    //     ? [updateUserDto.authorsId]
    //     : updateUserDto.authorsId;
    updateUserDto.booksId =
      typeof updateUserDto.booksId === 'string'
        ? [updateUserDto.booksId]
        : updateUserDto.booksId;
    updateUserDto.genresId =
      typeof updateUserDto.genresId === 'string'
        ? [updateUserDto.genresId]
        : updateUserDto.genresId;

    return this.usersService.update(req.user.id, updateUserDto, image);
  }

  @ApiTags('Users')
  @HttpCode(204)
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Delete()
  remove(@Req() req: Request) {
    return this.usersService.remove(req.user.id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiTags('Admin/Users')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Patch(':idUser')
  updateForAdmin(
    @Param() idUser: string,
    @Body() updateUserDto: UpdateUserDto,
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
    if (updateUserDto.password || updateUserDto.confirmPassword) {
      if (updateUserDto.password !== updateUserDto.confirmPassword) {
        throw new BadRequestException('As senhas devem ser iguais');
      }
    }

    return this.usersService.update(idUser, updateUserDto, image);
  }

  @HttpCode(204)
  @ApiTags('Admin/Users')
  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Delete(':idUser')
  removeForAdmin(@Param() idUser: string) {
    return this.usersService.remove(idUser);
  }
}
