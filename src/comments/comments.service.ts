import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import avgGradeCalc from 'src/utils/avgGrade';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
        select: { id: true, name: true, avgGrade: true, counterGrade: true },
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

    await this.repository.book.update({
      where: {
        id: bookId,
      },
      data: {
        totalGrade,
        counterGrade,
        avgGrade,
      },
    });

    return await this.repository.comment.create({
      data: {
        text,
        bookGrade,
        userId,
        bookId,
      },
      ...this.selectFields,
    });
  }

  async findAll() {
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
    const { text, bookGrade, bookId } = updateCommentDto;

    const book = await this.getBookById(bookId);

    if (!book) {
      throw new NotFoundException('O livro não existe');
    }

    const commentBelongsToTheUserLogged = await this.getCommentByUser(
      id,
      userId,
    );

    if (!commentBelongsToTheUserLogged) {
      throw new UnauthorizedException(
        'O comentário não existe ou não foi feito pelo usuário',
      );
    }

    const bookGrades = avgGradeCalc(
      bookGrade,
      book.totalGrade - commentBelongsToTheUserLogged.bookGrade,
      book.counterGrade - 1,
    );

    const { totalGrade, counterGrade, avgGrade } = bookGrades;

    await this.repository.book.update({
      where: {
        id: bookId,
      },
      data: {
        totalGrade,
        counterGrade,
        avgGrade,
      },
    });

    return await this.repository.comment.update({
      where: {
        id,
      },
      data: {
        text,
        bookGrade,
        userId,
        bookId,
      },
      ...this.selectFields,
    });
  }

  async remove(id: string, userId: string) {
    const comment = await this.findOne(id);

    const book = await this.getBookById(comment.book.id);

    if (!book) {
      throw new NotFoundException('O livro não existe');
    }
    6;
    const commentBelongsToTheUserLogged = await this.getCommentByUser(
      id,
      userId,
    );

    if (!commentBelongsToTheUserLogged) {
      throw new UnauthorizedException(
        'O comentário não existe ou não foi feito pelo usuário',
      );
    }

    const bookGrades = avgGradeCalc(
      0,
      book.totalGrade - comment.bookGrade,
      book.counterGrade - 2,
    );

    const { totalGrade, counterGrade, avgGrade } = bookGrades;

    await this.repository.book.update({
      where: {
        id: comment.book.id,
      },
      data: {
        totalGrade,
        counterGrade,
        avgGrade,
      },
    });

    await this.repository.comment.delete({
      where: {
        id,
      },
    });
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
    });
  }
}
