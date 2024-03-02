import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import deleteFile from 'src/utils/bucketIntegration/delete';
import upload from 'src/utils/bucketIntegration/upload';
import { CreateAuthorDto } from './dto/create-author.dto';
import { TransationAuthorDto } from './dto/transation-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly repository: PrismaService) {}
  selectFields = {
    id: true,
    name: true,
    imageUrl: true,
    birthplace: true,
    carrerDescription: true,
    createdAt: true,
    updatedAt: true,
    Users: {
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    Genders: { select: { gender: true } },
  };
  async create(createAuthorDto: CreateAuthorDto, image: Express.Multer.File) {
    return await this.transactionAuthorGender(image, createAuthorDto, 'create');
  }

  async findAll(genres?: Array<string>) {
    if (genres && genres.length > 0) {
      return await this.repository.author.findMany({
        where: {
          Genders: {
            some: { gender: { OR: genres.map(g => ({ gender: g })) } },
          },
        },
        select: this.selectFields,
      });
    }
    return await this.repository.author.findMany({ select: this.selectFields });
  }

  async findOne(id: string) {
    return await this.repository.author.findUniqueOrThrow({
      where: { id },
      select: this.selectFields,
    });
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
    image: Express.Multer.File,
  ) {
    return await this.transactionAuthorGender(
      image,
      updateAuthorDto,
      'update',
      id,
    );
  }

  async remove(id: string) {
    await this.repository.genderAuthor.deleteMany({
      where: { authorId: id },
    });
    const { imageUrl } = await this.repository.author.delete({
      where: { id },
      select: { imageUrl: true },
    });
    deleteFile(imageUrl, 'authors');

    return;
  }
  private async transactionAuthorGender(
    image: Express.Multer.File,
    authorDto: TransationAuthorDto,
    action: 'create' | 'update',
    idAuthor?: string,
  ) {
    const { genres, ...rest } = authorDto;
    const queries = [];
    if (image) {
      queries.push(upload(image, 'authors'));
    }
    if (genres) {
      queries.push(
        this.repository.gender.findMany({
          where: { id: { in: genres } },
          select: { id: true, gender: true },
        }),
      );
    }

    const promisses = await Promise.all(queries);
    const promisesLength = promisses.length;
    let imageUrl;
    let genresDb;

    switch (promisesLength) {
      case 1:
        typeof promisses[0] === 'string'
          ? (imageUrl = promisses[0])
          : (genresDb = promisses[0]);

        break;

      case 2:
        imageUrl = promisses[0];
        genresDb = promisses[1];
        break;
    }

    if (genres && genresDb.length !== genres.length) {
      throw new BadRequestException('Genres not found');
    }

    const authorWithGenres = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        let author;
        switch (action) {
          case 'create':
            author = await txtPrisma.author.create({
              data: {
                imageUrl: imageUrl,
                birthplace: rest.birthplace,
                carrerDescription: rest.carrerDescription,
                name: rest.name,
                ...rest,
              },
              select: this.selectFields,
            });
            await txtPrisma.genderAuthor.createMany({
              data: genres.map(genreId => ({
                authorId: author.id,
                genderId: genreId,
              })),
            });
            break;

          case 'update':
            author = await txtPrisma.author.update({
              where: { id: idAuthor },
              data: { imageUrl, ...rest },
              select: this.selectFields,
            });
            if (genres) {
              await txtPrisma.genderAuthor.updateMany({
                data: genres.map(genreId => ({
                  authorId: author.id,
                  genderId: genreId,
                })),
              });
            }
            break;

          default:
            throw new BadRequestException('Invalid action');
        }

        if (genres) {
          author.Genders = genresDb.map(gender => ({
            gender: { id: gender.id, gender: gender.gender },
          }));
        }

        return author;
      },
    );
    return authorWithGenres;
  }
}
