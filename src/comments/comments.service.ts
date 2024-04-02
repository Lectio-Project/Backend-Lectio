import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import avgGradeCalc from 'src/utils/avgGrade';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { calculatePagination } from 'src/utils/pagination/pagination-function';

@Injectable()
export class CommentsService {
  constructor(private readonly repository: PrismaService) {}

  selectFields = {
    select: {
      id: true,
      text: true,
      bookGrade: true,
      createdAt: true,
      updatedAt: true,
      book: {
        select: {
          id: true,
          name: true,
          avgGrade: true,
          counterGrade: true,
          totalGrade: true,
        },
      },
      user: {
        select: { id: true, name: true, imageUrl: true, username: true },
      },
    },
  };
  async create(userId: string, createCommentDto: CreateCommentDto) {
    const book = await this.getBookById(createCommentDto.bookId);

    if (!book) {
      throw new NotFoundException('O livro não existe');
    }

    const { text, bookGrade, bookId } = createCommentDto;

    const bookGrades = avgGradeCalc(
      bookGrade,
      book.totalGrade,
      book.counterGrade,
    );

    const { totalGrade, counterGrade, avgGrade } = bookGrades;

    return await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        await txtPrisma.book.update({
          where: {
            id: bookId,
          },
          data: {
            totalGrade,
            counterGrade,
            avgGrade,
          },
        });
        return await txtPrisma.comment.create({
          data: {
            text,
            bookGrade,
            userId,
            bookId,
          },
          ...this.selectFields,
        });
      },
    );
  }

  async findAll(page?: number, quantityPerPage?: number) {
    if (page || quantityPerPage) {
      const amountRows = await this.repository.comment.count();
      const { skip, take, pagination } = calculatePagination(
        amountRows,
        page,
        quantityPerPage,
      );

      const rows = await this.repository.comment.findMany({
        skip,
        take,
      });

      return [pagination, ...rows];
    }

    return await this.repository.comment.findMany(this.selectFields);
  }

  async findOne(id: string) {
    return await this.repository.comment.findUniqueOrThrow({
      where: {
        id,
      },
      ...this.selectFields,
    });
  }

  async update(userId: string, id: string, updateCommentDto: UpdateCommentDto) {
    const { text, bookGrade } = updateCommentDto;

    const commentBelongsToTheUserLogged = await this.getCommentByUser(
      id,
      userId,
    );

    if (!commentBelongsToTheUserLogged) {
      throw new UnauthorizedException(
        'O comentário não existe ou não foi feito pelo usuário',
      );
    }

    const newData = {
      newBookGrade: {},
      newCommentData: {},
    };

    const { bookGrade: oldBookGrade, book } = commentBelongsToTheUserLogged;

    if (bookGrade) {
      const newBookGrade = avgGradeCalc(
        bookGrade,
        book.totalGrade - oldBookGrade,
        book.counterGrade - 1,
      );
      newData.newBookGrade = newBookGrade;
      newData.newCommentData = {
        bookGrade,
      };
    }

    if (text) {
      newData.newCommentData = {
        text,
      };
    }

    return await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        await txtPrisma.book.update({
          where: {
            id: book.id,
          },
          data: {
            ...newData.newBookGrade,
          },
        });

        return await txtPrisma.comment.update({
          where: {
            id,
          },
          data: {
            ...newData.newCommentData,
          },
          ...this.selectFields,
        });
      },
    );
  }

  async remove(id: string, userId: string) {
    const commentBelongsToTheUserLogged = await this.getCommentByUser(
      id,
      userId,
    );

    if (!commentBelongsToTheUserLogged) {
      throw new UnauthorizedException(
        'O comentário não existe ou não foi feito pelo usuário',
      );
    }

    const { book, bookGrade } = commentBelongsToTheUserLogged;

    const { totalGrade, counterGrade, avgGrade } = avgGradeCalc(
      0,
      book.totalGrade - bookGrade,
      book.counterGrade - 2,
    );
    await this.repository.$transaction(async (txtPrisma: PrismaService) => {
      await txtPrisma.book.update({
        where: { id: book.id },
        data: {
          totalGrade,
          counterGrade,
          avgGrade,
        },
      });
      await txtPrisma.comment.delete({
        where: { id },
      });
    });
    return;
  }

  private async getBookById(id: string) {
    return await this.repository.book.findUnique({
      where: {
        id,
      },
    });
  }

  private async getCommentByUser(id: string, userId: string) {
    return await this.repository.comment.findUnique({
      where: {
        id,
        userId,
      },
      ...this.selectFields,
    });
  }
}
