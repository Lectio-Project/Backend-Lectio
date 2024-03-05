/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import deleteFile from 'src/utils/bucketIntegration/delete';
import upload from 'src/utils/bucketIntegration/upload';
import generateUsername from 'src/utils/formats/createUsername';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: PrismaService,
    private readonly jwt: AuthService,
  ) {}
  selectFields = {
    id: true,
    name: true,
    email: true,
    username: true,
    bio: true,
    imageUrl: true,
    createdAt: true,
    updatedAt: true,
  };
  async create(image: Express.Multer.File, createUserDto: CreateUserDto) {
    const queries = [
      this.getByEmail(createUserDto.email),
      this.getByUsername(createUserDto.userName),
    ];

    const [emailExists, userNameExists] = await Promise.all(queries);

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    if (createUserDto.userName && userNameExists) {
      throw new BadRequestException('Username already exists');
    }

    if (image) {
      createUserDto.image = await upload(image, 'profiles');
    }

    createUserDto.userName =
      createUserDto.userName || generateUsername(createUserDto.name);

    const passwordHashed = await bcryptjs.hash(createUserDto.password, 8);
    const {
      checked,
      confirmPassword,
      image: imageDto,
      userName,
      ...rest
    } = createUserDto;

    const user = await this.repository.user.create({
      data: {
        ...rest,
        password: passwordHashed,
        username: userName,
        imageUrl: imageDto,
      },
      select: this.selectFields,
    });

    const token = this.jwt.generateToken(user);

    return {
      ...user,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.getByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('User credentials do not match');
    }

    const passwordIsMatch = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordIsMatch) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const token = this.jwt.generateToken(user);

    const { id, name, email, username, bio, imageUrl } = user;

    return {
      id,
      name,
      email,
      username,
      bio,
      imageUrl,
      token,
    };
  }

  async findAll() {
    return await this.repository.user.findMany({
      select: this.selectFields,
    });
  }

  async findOne(id: string) {
    return await this.repository.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: this.selectFields,
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    image: Express.Multer.File,
  ) {
    if (updateUserDto.email) {
      const emailAlreadyExists = await this.getByEmail(updateUserDto.email, id);

      if (emailAlreadyExists) {
        throw new BadRequestException('Email already exists');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 8);
    }

    if (image) {
      updateUserDto.image = await upload(image, 'profiles');
    }

    const {
      image: imageDto,
      checked,
      confirmPassword,
      ...rest
    } = updateUserDto;
    const updateUser = await this.repository.user.update({
      where: { id },
      data: { ...rest, imageUrl: imageDto },
      select: this.selectFields,
    });

    return updateUser;
  }

  async remove(id: string) {
    const { imageUrl } = await this.repository.user.delete({
      where: { id },
      select: { imageUrl: true },
    });
    deleteFile(imageUrl, 'profiles');

    return;
  }

  private async getByEmail(email: string, id?: string) {
    return await this.repository.user.findFirst({
      where: {
        email,
        id: { not: id },
      },
    });
  }

  private getByUsername(userName: string) {
    return this.repository.user.findFirst({
      where: {
        username: userName,
      },
    });
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTYxZmIwNjRiNmYyOWI5ZjQ0OGFkOCIsIm5hbWUiOiJ0ZXN0ZSB0ZXN0ZSIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkS29VTm1EODF1SjlZTzkzLnhrbmE0ZWdrWkVZSDJGb1lPV0V6cVZObWM5QmJHdDNVcVZ1VDYiLCJ1c2VybmFtZSI6IkB0ZXN0ZTE3MDk1ODAyMDc5OTkiLCJiaW8iOm51bGwsImltYWdlVXJsIjoiaHR0cHM6Ly9sZWN0aW8uczMudXMtZWFzdC0wMDUuYmFja2JsYXplYjIuY29tL3Byb2ZpbGVzL21hcmNhYWFvLWRlLWV4YW1lcy10ZXN0ZS1zbHVnLTE3MDk1ODAyMDYyMzguanBnIiwiY3JlYXRlZEF0IjoiMjAyNC0wMy0wNFQxOToyMzoyOC4wNDJaIiwidXBkYXRlZEF0IjoiMjAyNC0wMy0wNFQxOToyMzoyOC4wNDJaIiwiaWF0IjoxNzA5NjU1OTQ5LCJleHAiOjE3MTAyNjA3NDl9.DQzyO5-yK-Aj7zPukhwHlwO7HvsxGXWJQzpGdFTCJIA
