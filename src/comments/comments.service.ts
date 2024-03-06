import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import avgGradeCalc from 'src/utils/avgGrade';

@Injectable()
export class CommentsService {
  constructor(private readonly repository: PrismaService) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    const book = await this.getBookById(createCommentDto.bookId);

    if (!book) {
      throw new NotFoundException('Book does not exist');
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
      select: {
        id: true,
        text: true,
        bookGrade: true,
        userId: true,
        bookId: true,
      },
    });
  }

  async findAll() {
    return await this.repository.comment.findMany();
  }

  async findOne(id: string) {
    return await this.repository.comment.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(userId: string, id: string, updateCommentDto: UpdateCommentDto) {
    const { text, bookGrade, bookId } = updateCommentDto;

    const book = await this.getBookById(bookId);

    if (!book) {
      throw new NotFoundException('Book does not exist');
    }

    const commentBelongsToTheUserLogged = await this.getCommentByUser(
      id,
      userId,
    );

    if (!commentBelongsToTheUserLogged) {
      throw new UnauthorizedException(
        'Comment does not exist or does not belong to the user',
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
      select: {
        id: true,
        text: true,
        bookGrade: true,
        userId: true,
        bookId: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    const comment = await this.findOne(id);

    const book = await this.getBookById(comment.bookId);

    if (!book) {
      throw new NotFoundException('Book does not exist');
    }

    const commentBelongsToTheUserLogged = await this.getCommentByUser(
      id,
      userId,
    );

    if (!commentBelongsToTheUserLogged) {
      throw new UnauthorizedException(
        'Comment does not exist or does not belong to the user',
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
        id: comment.bookId,
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
