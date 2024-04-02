import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculatePagination } from 'src/utils/pagination/pagination-function';
import { CreateThoughtDto } from './dto/create-thought.dto';
import { UpdateThoughtDto } from './dto/update-thought.dto';

@Injectable()
export class ThoughtService {
  constructor(private readonly repository: PrismaService) {}

  selectFields = {
    select: {
      id: true,
      text: true,
      bookId: true,
      createdAt: true,
      updatedAt: true,
      book: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          AuthorBook: { select: { author: { select: { name: true } } } },
        },
      },
    },
  };

  async create(createThoughtDto: CreateThoughtDto) {
    const book = await this.getBookById(createThoughtDto.bookId);

    if (!book) {
      throw new NotFoundException('Livro não encontrado');
    }

    return await this.repository.thought.create({
      data: {
        text: createThoughtDto.phrase,
        bookId: book.id,
      },
      ...this.selectFields,
    });
  }

  async findAll(page?: number, quantityPerPage?: number) {
    if (page || quantityPerPage) {
      const amountRows = await this.repository.thought.count();
      const { skip, take, pagination } = calculatePagination(
        amountRows,
        page,
        quantityPerPage,
      );

      const rows = await this.repository.thought.findMany({
        skip,
        take,
      });

      return [pagination, ...rows];
    }

    return await this.repository.thought.findMany();
  }

  async findOne(id: string) {
    return await this.repository.thought.findUniqueOrThrow({
      where: { id },
      ...this.selectFields,
    });
  }

  async update(id: string, updateThoughtDto: UpdateThoughtDto) {
    const book = await this.getBookById(updateThoughtDto.bookId);

    if (!book) {
      throw new NotFoundException('Livro não encontrado');
    }

    return await this.repository.thought.update({
      where: {
        id,
      },
      data: {
        text: updateThoughtDto.phrase,
        bookId: book.id,
      },
      ...this.selectFields,
    });
  }

  async remove(id: string) {
    return await this.repository.thought.delete({
      where: { id },
    });
  }

  private async getBookById(id: string) {
    return await this.repository.book.findFirst({
      where: {
        id,
      },
    });
  }
}
