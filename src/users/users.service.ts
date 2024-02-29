/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import upload from 'src/utils/bucketIntegration/upload';
import generateUsername from 'src/utils/formats/createUsername';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: PrismaService) {}
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
      createUserDto.image = await upload(image);
    }

    const newUserName =
      createUserDto.userName || generateUsername(createUserDto.name);

    const passwordHashed = await bcryptjs.hash(createUserDto.password, 8);
    const {
      checked,
      confirmPassword,
      image: imageDto,
      ...rest
    } = createUserDto;

    return await this.repository.user.create({
      data: {
        ...rest,
        password: passwordHashed,
        username: newUserName,
        imageUrl: imageDto,
      },
    });
  }

  // colocar o guard de auth
  async findAll() {
    return await this.repository.user.findMany();
  }

  // colocar o guard de auth
  async findOne(id: string) {
    return await this.repository.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async getByEmail(email: string) {
    return await this.repository.user.findUnique({
      where: {
        email,
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
