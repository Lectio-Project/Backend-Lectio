import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import avgGradeCalc from 'src/utils/avgGrade';
import upload from 'src/utils/bucketIntegration/upload';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly repository: PrismaService) {}

  async create(createBookDto: CreateBookDto, image: Express.Multer.File) {
    const { authorId, ...rest } = createBookDto;

    await this.validateInitialDataInDb({
      ...rest,
      authorId: authorId as Array<string>,
    });

    const imageUrl = await upload(image, 'books');

    const response = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        const book = await txtPrisma.book.create({
          data: {
            ...rest,
            imageUrl,
            AuthorBook: {
              create: (authorId as Array<string>).map(author => ({
                author: {
                  connect: { id: author },
                },
              })),
            },
          },
          select: this.selectFieldsResult({ type: 'inserts' }),
        });

        return book;
      },
    );

    return response;
  }

  async findAll(add?: Array<string>, filters?: Array<string>) {
    const selectFields = { select: this.selectFieldsResult() };
    if (add) {
      selectFields.select = this.selectFieldsResult({
        type: 'fields',
        fields: add,
      });
      console.log(
        this.selectFieldsResult({
          type: 'fields',
          fields: add,
        }),
      );
    }
    if (filters) {
    }

    return await this.repository.book.findMany(selectFields);
  }

  async findOne(id: string) {
    return await this.repository.book.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    image: Express.Multer.File,
  ) {
    const { authorId, grade, ...rest } = updateBookDto;

    let data = { ...rest };

    const book = await this.validateInitialDataInDb({
      ...updateBookDto,
      authorId: authorId as Array<string>,
      idBook: id,
    });

    if (image) {
      data['imageUrl'] = await upload(image, 'books');
    }

    if (grade) {
      const result = avgGradeCalc(+grade, book.totalGrade, book.counterGrade);

      data = {
        ...data,
        ...result,
      };
    }

    const newBook = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        if (authorId) {
          await txtPrisma.authorBook.deleteMany({
            where: {
              bookId: id,
            },
          });
        }
        const book = await txtPrisma.book.update({
          where: { id },
          data: {
            ...data,
            AuthorBook: {
              create: (authorId as Array<string>)?.map(author => ({
                author: {
                  connect: { id: author },
                },
              })),
            },
          },
          select: this.selectFieldsResult({ type: 'inserts' }),
        });

        return book;
      },
    );

    return newBook;
  }

  async remove(id: string) {
    await this.repository.$transaction(async (txtPrisma: PrismaService) => {
      await txtPrisma.authorBook.deleteMany({
        where: { bookId: id },
      });
      await txtPrisma.book.delete({
        where: { id },
      });
    });
    return;
  }

  private async validateInitialDataInDb(data: {
    authorId?: Array<string>;
    genderId?: string;
    name?: string;
    idBook?: string;
  }) {
    const { authorId, genderId, name, idBook } = data;

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
      name: async (name: string, idBook: string) => {
        return this.repository.book.findFirst({
          where: {
            OR: [{ id: idBook }, { name: name }],
          },
        });
      },
    };

    const queries = [];
    let book;

    authorId ? queries.push(promises.authorId(authorId)) : null;
    genderId ? queries.push(promises.genderId(genderId)) : null;
    name ? queries.push(promises.name(name, idBook)) : null;

    const results = await Promise.all(queries);

    if (authorId && results[0].length !== authorId.length) {
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

  private selectFieldsResult(options?: {
    type?: 'inserts' | 'fields';
    fields?: Array<string>;
  }) {
    let selectFields: any = {
      id: true,
      name: true,
      publishYear: true,
      publishingCompany: true,
      synopsis: true,
      imageUrl: true,
      totalGrade: true,
      counterGrade: true,
      avgGrade: true,
    };

    if (!options) {
      return selectFields;
    }

    const { type, fields } = options;

    if (type === 'inserts') {
      selectFields = {
        ...selectFields,
        gender: true,
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
      };
    }

    if (type === 'fields' && fields.includes('author')) {
      selectFields = {
        ...selectFields,
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
      };
    }

    if (type === 'fields' && fields.includes('gender')) {
      selectFields = {
        ...selectFields,
        gender: true,
      };
    }

    if (type === 'fields' && fields.includes('user')) {
      selectFields = {
        ...selectFields,
        UserBook: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                imageUrl: true,
                name: true,
              },
            },
          },
        },
      };
    }

    if (type === 'fields' && fields.includes('thought')) {
      selectFields = {
        ...selectFields,
        Thought: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      };
    }

    if (type === 'fields' && fields.includes('comment')) {
      selectFields = {
        ...selectFields,
        Comment: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
          },
        },
      };
    }

    return selectFields;
  }
}
