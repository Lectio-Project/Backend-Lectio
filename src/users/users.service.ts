import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import generateUsername from 'src/utils/formats/createUsername';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
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

    const newUserName =
      createUserDto.userName || generateUsername(createUserDto.name);

    const passwordHashed = await bcrypt.hash(createUserDto.password, 8);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { checked, confirmPassword, ...rest } = createUserDto;

    return await this.repository.user.create({
      data: {
        ...rest,
        password: passwordHashed,
        username: newUserName,
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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
