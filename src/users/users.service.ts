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
import { calculatePagination } from 'src/utils/pagination/pagination-function';
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
    checkOnBoarding: true,
    UserBook: { select: { book: true } },
    UserGenres: { select: { gender: true } },
    UserAuthor: { select: { author: true } },
  };
  async create(image: Express.Multer.File, createUserDto: CreateUserDto) {
    if (!createUserDto.termsOfUse) {
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
      createUserDto.imageUrl = await upload(image, 'profiles');
    }

    createUserDto.userName =
      createUserDto.userName || generateUsername(createUserDto.name);

    const passwordHashed = await bcryptjs.hash(createUserDto.password, 8);

    const { confirmPassword, userName, ...rest } = createUserDto;

    const user = await this.repository.user.create({
      data: {
        ...rest,
        checkOnBoarding: false,
        password: passwordHashed,
        username: userName,
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

    const { id, name, email, username, bio, imageUrl, checkOnBoarding } = user;

    return {
      id,
      name,
      email,
      username,
      bio,
      imageUrl,
      checkOnBoarding,
      token,
    };
  }

  async findAll(page?: number, quantityPerPage?: number) {
    if (page || quantityPerPage) {
      const amountRows = await this.repository.user.count();
      const { skip, take, pagination } = calculatePagination(
        amountRows,
        page,
        quantityPerPage,
      );

      const rows = await this.repository.user.findMany({
        select: { ...this.selectFields },
        skip,
        take,
      });

      return [pagination, ...rows];
    }

    return await this.repository.user.findMany({
      select: this.selectFields,
    });
  }

  async findOne(id: string) {
    return await this.repository.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        ...this.selectFields,
      },
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
        throw new BadRequestException('E-mail já existe');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 8);
    }

    if (image) {
      updateUserDto.imageUrl = await upload(image, 'profiles');
    }

    const {
      termsOfUse,
      confirmPassword,
      authorsId,
      booksId,
      genresId,
      ...rest
    } = updateUserDto;

    const updates = await this.validationIdsRelatedsDocuments(
      authorsId,
      booksId,
      genresId,
    );

    const updateUser = await this.repository.user.update({
      where: { id },
      data: {
        ...rest,
        checkOnBoarding: updateUserDto.checkOnBoarding || false,
        ...updates,
      },
      select: this.selectFields,
    });

    return updateUser;
  }

  async remove(id: string) {
    const user = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        const queries = [
          txtPrisma.comment.deleteMany({
            where: { userId: id },
          }),
          txtPrisma.userBook.deleteMany({
            where: { userId: id },
          }),
          txtPrisma.userAuthor.deleteMany({
            where: { userId: id },
          }),
          txtPrisma.userGender.deleteMany({
            where: { userId: id },
          }),
        ];
        await Promise.all(queries);
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

  private async validationIdsRelatedsDocuments(
    authorsId?: string | Array<string>,
    booksId?: string | Array<string>,
    genresId?: string | Array<string>,
  ) {
    const queries = [];
    const updates = {};

    if (authorsId) {
      for (const id of authorsId) {
        queries.push(
          this.repository.author.findUniqueOrThrow({ where: { id } }),
        );
      }
      updates['UserAuthor'] = {
        createMany: {
          data: (authorsId as Array<string>)?.map(authorId => ({
            authorId,
          })),
        },
      };
    }
    if (booksId) {
      for (const id of booksId) {
        queries.push(this.repository.book.findUniqueOrThrow({ where: { id } }));
      }
      updates['UserBook'] = {
        createMany: {
          data: (booksId as Array<string>)?.map(bookId => ({ bookId })),
        },
      };
    }
    if (genresId) {
      for (const id of genresId) {
        queries.push(
          this.repository.gender.findUniqueOrThrow({ where: { id } }),
        );
      }
      updates['UserGenres'] = {
        createMany: {
          data: (genresId as Array<string>)?.map(genderId => ({
            genderId,
          })),
        },
      };
    }

    await Promise.all(queries);
    return updates;
  }
}
