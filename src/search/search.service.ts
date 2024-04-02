import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySearchCategoriesDto } from './dto/query-search-categories.dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}
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
        this.prisma.book.findMany({ where: { isMovie: true } }),
      );
      response['isMovie'] = Object.keys(response).length;
    }

    if (literaryAwards) {
      executeQueries.push(
        this.prisma.literaryAwards.findMany({
          select: {
            id: true,
            name: true,
            year: true,
            Book: {
              select: {
                id: true,
                name: true,
                gender: true,
                imageUrl: true,
                synopsis: true,
                totalGrade: true,
                counterGrade: true,
                avgGrade: true,
                publishYear: true,
                publishingCompany: true,
                AuthorBook: {
                  select: {
                    author: {
                      select: { id: true, name: true, imageUrl: true },
                    },
                  },
                },
              },
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
        }),
      );
      response['weekPopulater'] = Object.keys(response).length;
    }

    if (bestRated) {
      executeQueries.push(
        this.prisma.book.findMany({ where: { avgGrade: { gte: 4.5 } } }),
      );
      response['bestRated'] = Object.keys(response).length;
    }

    const executedPromisses = await Promise.all(executeQueries);

    for (const [key, value] of Object.entries(response)) {
      response[key] = executedPromisses[Number(value)];
    }

    return response;
  }
}
