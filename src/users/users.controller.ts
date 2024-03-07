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
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IsValidImageFile } from 'src/utils/validators/IsValidImageFile';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseInterceptors(FileInterceptor('image'))
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
      throw new BadRequestException('Passwords do not match');
    }
    return this.usersService.create(image, createUserDto);
  }

  @Post('sign-in')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

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
      throw new BadRequestException('Passwords do not match');
    }

    return this.usersService.update(req.user.id, updateUserDto, image);
  }

  @HttpCode(204)
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Delete()
  remove(@Req() req: Request) {
    return this.usersService.remove(req.user.id);
  }
}
