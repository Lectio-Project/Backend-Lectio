import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySearchCategoriesDto } from './dto/query-search-categories.dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  selectFields = {
    select: {
      id: true,
      name: true,
      imageUrl: true,
      publishYear: true,
      publishingCompany: true,
      totalGrade: true,
      counterGrade: true,
      avgGrade: true,
      synopsis: true,
      gender: { select: { gender: true } },
      isbn13: true,
      isMovie: true,
      totalPages: true,
      LiteraryAwards: { select: { id: true, name: true, year: true } },
      Comment: {
        select: {
          id: true,
          bookGrade: true,
          text: true,
          createdAt: true,
          updatedAt: true,
          user: { select: { name: true, id: true, imageUrl: true } },
        },
      },
      AuthorBook: {
        select: {
          author: {
            select: {
              id: true,
              name: true,
              carrerDescription: true,
              imageUrl: true,
              sexGender: true,
              birthplace: true,
              avgGrade: true,
              counterGrade: true,
              totalGrade: true,
            },
          },
        },
      },
    },
  };
  async findAllCategories(queries: QuerySearchCategoriesDto) {
    const {
      isMovie,
      literaryAwards,
      sexGenderAuthor,
      weekPopulater,
      bestRated,
    } = queries;
    const executeQueries = [];
    const response = {};

    if (isMovie) {
      executeQueries.push(
        this.prisma.book.findMany({
          where: { isMovie: true },
          ...this.selectFields,
        }),
      );
      response['isMovie'] = Object.keys(response).length;
    }

    if (literaryAwards) {
      executeQueries.push(
        this.prisma.literaryAwards.findMany({
          select: {
            Book: {
              ...this.selectFields,
            },
          },
        }),
      );
      response['literaryAwards'] = Object.keys(response).length;
    }

    if (sexGenderAuthor) {
      executeQueries.push(
        this.prisma.author.findMany({
          where: { sexGender: sexGenderAuthor === 'male' ? 'male' : 'woman' },
          select: {
            AuthorBook: { select: { book: { ...this.selectFields } } },
          },
        }),
      );
      response['sexGenderAuthor'] = Object.keys(response).length;
    }

    if (weekPopulater) {
      const hoje = new Date();
      const seteDiasAtras = new Date();
      seteDiasAtras.setDate(hoje.getDate() - 7);

      executeQueries.push(
        this.prisma.book.findMany({
          where: {
            createdAt: {
              gte: seteDiasAtras,
              lte: hoje,
            },
          },
          ...this.selectFields,
        }),
      );
      response['weekPopulater'] = Object.keys(response).length;
    }

    if (bestRated) {
      executeQueries.push(
        this.prisma.book.findMany({
          where: { avgGrade: { gte: 4.5 } },
          ...this.selectFields,
        }),
      );
      response['bestRated'] = Object.keys(response).length;
    }

    const executedPromisses = await Promise.all(executeQueries);

    for (const [key, value] of Object.entries(response)) {
      response[key] = executedPromisses[Number(value)];
    }

    return response;
  }

  async findAllGenres(genresId: Array<string>) {
    return await this.prisma.book.findMany({
      where: { genderId: { in: genresId } },
      ...this.selectFields,
    });
  }
  async findAll(query: string) {
    return await this.prisma.book.findMany({
      where: {
        OR: [
          {
            name: { contains: query, mode: 'insensitive' },
          },
          { synopsis: { contains: query, mode: 'insensitive' } },
          {
            LiteraryAwards: {
              some: { name: { contains: query, mode: 'insensitive' } },
            },
          },
          { gender: { gender: { contains: query, mode: 'insensitive' } } },
          {
            AuthorBook: {
              some: {
                author: { name: { contains: query, mode: 'insensitive' } },
              },
            },
          },
          {
            AuthorBook: {
              some: {
                author: {
                  carrerDescription: { contains: query, mode: 'insensitive' },
                },
              },
            },
          },
        ],
      },
      ...this.selectFields,
    });
  }
}
