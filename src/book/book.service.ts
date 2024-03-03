import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import upload from 'src/utils/bucketIntegration/upload';
import avgGradeCalc from 'src/utils/validators/avgGrade';
import { CreateBookServiceDto } from './dto/creat-book-service.dto';
import { UpdateBookServiceDto } from './dto/update-book-service.dto';

@Injectable()
export class BookService {
  constructor(private readonly repository: PrismaService) {}

  async create(
    createBookDto: CreateBookServiceDto,
    image: Express.Multer.File,
  ) {
    const {
      authorIds,
      genderId,
      name,
      publishYear,
      publishingCompany,
      synopsis,
    } = createBookDto;

    await this.validateInitialDataInDb({ ...createBookDto });

    const imageUrl = await upload(image, 'books');

    const response = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        const book = await txtPrisma.book.create({
          data: {
            name,
            publishYear,
            publishingCompany,
            synopsis,
            genderId,
            imageUrl,
            AuthorBook: {
              create: authorIds.map(author => ({
                author: {
                  connect: { id: author },
                },
              })),
            },
          },
          select: {
            id: true,
            name: true,
            publishYear: true,
            publishingCompany: true,
            synopsis: true,
            gender: true,
            imageUrl: true,
            AuthorBook: {
              select: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        });

        return book;
      },
    );

    return response;
  }

  async findAll() {
    return await this.repository.book.findMany();
  }

  async findOne(id: string) {
    return await this.repository.book.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(
    id: string,
    updateBookDto: UpdateBookServiceDto,
    image: Express.Multer.File,
  ) {
    const {
      authorIds,
      grade,
      genderId,
      name,
      publishYear,
      publishingCompany,
      synopsis,
    } = updateBookDto;

    const book = await this.validateInitialDataInDb({
      ...updateBookDto,
      idBook: id,
    });

    let imageUrl: string;
    if (image) {
      imageUrl = await upload(image, 'books');
    }

    let avgGrade: number;
    let counterGrade: number;
    let totalGrade: number;
    if (grade) {
      const { avg, counter, sum } = avgGradeCalc(
        grade,
        book.totalGrade,
        book.counterGrade,
      );

      avgGrade = avg;
      totalGrade = sum;
      counterGrade = counter;
    }

    const newBook = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        const book = await txtPrisma.book.update({
          where: { id },
          data: {
            name,
            publishYear,
            publishingCompany,
            synopsis,
            genderId,
            imageUrl,
            totalGrade,
            counterGrade,
            avgGrade,
            AuthorBook: {
              create: authorIds?.map(author => ({
                author: {
                  connect: { id: author },
                },
              })),
            },
          },
        });
        if (authorIds) {
          await txtPrisma.authorBook.deleteMany({
            where: { bookId: id, NOT: { authorId: { in: authorIds } } },
          });
        }
        return book as Book;
      },
    );

    return newBook;
  }

  async remove(id: string) {
    await this.repository.$transaction(async (txtPrisma: PrismaService) => {
      await txtPrisma.book.delete({
        where: { id },
        include: { AuthorBook: { where: { bookId: id } } },
      });
    });
    return;
  }

  private async validateInitialDataInDb(data: {
    authorIds?: Array<string>;
    genderId?: string;
    name?: string;
    idBook?: string;
  }) {
    const { authorIds, genderId, name, idBook } = data;

    const promises = {
      authorId: async (authorIds: Array<string>) => {
        return this.repository.author.findMany({
          where: { id: { in: authorIds } },
        });
      },
      genderId: async (genderId: string) => {
        return this.repository.gender.findUniqueOrThrow({
          where: { id: genderId },
        });
      },
      name: async (name: string) => {
        return this.repository.book.findUnique({
          where: { name: name },
        });
      },
    };

    const queries = [];
    let book;

    if (authorIds) {
      queries.push(promises.authorId(authorIds));
    }
    if (genderId) {
      queries.push(promises.genderId(genderId));
    }
    if (name) {
      queries.push(promises.name(name));
    }

    const results = await Promise.all(queries);

    if (authorIds && results[0].length !== authorIds.length) {
      throw new NotFoundException('Author not found');
    }

    if (name && results[results.length - 1]) {
      const bookResult = results[results.length - 1] as Book;
      if (bookResult.id !== idBook) {
        throw new ConflictException('Book already exists');
      }
      book = bookResult;
    }

    return book as Book;
  }
}
