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
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

interface IFilters extends Omit<QueryBookDto, 'add'> {}

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
          select: this.selectFieldsResult(),
        });

        return book;
      },
    );

    return response;
  }

  async findAll(add?: Array<string>, filters?: IFilters) {
    const query = {
      select: this.selectFieldsResult(),
    };
    const newAdd = filters ? [] : [...new Set([...add])];

    if (filters) {
      const { where, filteredFilters } = this.filterFieldById({ ...filters });
      query['where'] = where;

      const set = add ? new Set([...add, ...filteredFilters]) : filteredFilters;

      newAdd.push(...set);
    }

    if (newAdd.length > 0) {
      query.select = this.selectFieldsResult({
        fields: newAdd,
      });
    }

    return await this.repository.book.findMany(query);
  }

  async findOne(id: string, add: Array<string>) {
    let selectFields = this.selectFieldsResult();
    if (add) {
      const newAdd = [...new Set([...add])];

      selectFields = this.selectFieldsResult({
        fields: newAdd,
      });
    }
    return await this.repository.book.findUniqueOrThrow({
      where: { id },
      select: selectFields,
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
          select: this.selectFieldsResult(),
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
      throw new NotFoundException('Autor não encontrado');
    }

    if (name && results[results.length - 1]) {
      const bookResult = results[results.length - 1] as Book;
      if (bookResult.id !== idBook) {
        throw new ConflictException('O livro já existe');
      }
      book = bookResult;
    }

    return book as Book;
  }

  private selectFieldsResult(options?: { fields?: Array<string> }) {
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
      createdAt: true,
      updatedAt: true,
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

    if (!options) {
      return selectFields;
    }

    const { fields } = options;

    if (fields.includes('user')) {
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

    if (fields.includes('thought')) {
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

    if (fields.includes('comment')) {
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

  private filterFieldById(filters?: {
    authorId?: string | Array<string>;
    genderId?: string | Array<string>;
    userId?: string | Array<string>;
    commentId?: string | Array<string>;
    thoughtId?: string | Array<string>;
  }) {
    if (!filters) {
      return;
    }
    const { authorId, genderId, userId, commentId, thoughtId } = filters;
    const where: any = { AND: [] };
    const tempAND = [];
    const filteredFilters = [];

    if (authorId) {
      const newAuthorId = typeof authorId === 'string' ? [authorId] : authorId;
      tempAND.push({
        AuthorBook: { some: { author: { id: { in: newAuthorId } } } },
      });
      filteredFilters.push('author');
    }

    if (genderId) {
      const newGenderId = typeof genderId === 'string' ? [genderId] : genderId;
      tempAND.push({ gender: { id: { in: newGenderId } } });
      filteredFilters.push('gender');
    }

    if (userId) {
      const newUserId = typeof userId === 'string' ? [userId] : userId;
      tempAND.push({ UserBook: { some: { userId: { in: newUserId } } } });
      filteredFilters.push('user');
    }

    if (commentId) {
      const newCommentId =
        typeof commentId === 'string' ? [commentId] : commentId;
      tempAND.push({ Comment: { some: { id: { in: newCommentId } } } });
      filteredFilters.push('comment');
    }

    if (thoughtId) {
      const newThoughtId =
        typeof thoughtId === 'string' ? [thoughtId] : thoughtId;
      tempAND.push({ Thought: { some: { id: { in: newThoughtId } } } });
      filteredFilters.push('thought');
    }

    where.AND = tempAND;

    return { where, filteredFilters };
  }
}
