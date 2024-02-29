import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwt: AuthService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async login(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('User credentials do not match');
    }

    const passwordIsMatch = await bcrypt.compare(
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

  private async findByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
