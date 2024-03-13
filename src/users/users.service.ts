/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import * as dotenv from 'dotenv';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import deleteFile from 'src/utils/bucketIntegration/delete';
import upload from 'src/utils/bucketIntegration/upload';
import generateUsername from 'src/utils/formats/createUsername';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
dotenv.config();

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
    if (!createUserDto.checked) {
      throw new BadRequestException('Os termos de uso devem ser aceitos');
    }
    const queries = [
      this.getByEmail(createUserDto.email),
      this.getByUsername(createUserDto.userName),
    ];

    const [emailExists, userNameExists] = await Promise.all(queries);

    if (emailExists) {
      throw new BadRequestException('E-mail já existe');
    }

    if (createUserDto.userName && userNameExists) {
      throw new BadRequestException('Username já existe');
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
        termsOfUse: checked,
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
      throw new NotFoundException('As credencias do usuário são inválidas');
    }

    const passwordIsMatch = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordIsMatch) {
      throw new UnauthorizedException(
        'As credenciais do usuário são inválidas',
      );
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
    if (!updateUserDto.checked) {
      throw new BadRequestException('Os termos de uso devem ser aceitos');
    }

    if (updateUserDto.email) {
      const emailAlreadyExists = await this.getByEmail(updateUserDto.email, id);

      if (emailAlreadyExists) {
        throw new BadRequestException('E-mail já existe');
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
      data: { ...rest, imageUrl: imageDto, termsOfUse: checked },
      select: this.selectFields,
    });

    return updateUser;
  }

  async remove(id: string) {
    const user = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        await txtPrisma.comment.deleteMany({
          where: { userId: id },
        });
        return await txtPrisma.user.delete({
          where: { id },
        });
      },
    );

    if (user.imageUrl && user.imageUrl.includes(process.env.BUCKET_URL)) {
      deleteFile(user.imageUrl, 'profiles');
    }

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
