import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import upload from 'src/utils/bucketIntegration/upload';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly repository: PrismaService) {}

  async create(createBookDto: CreateBookDto, image: Express.Multer.File) {
    const { authorId, ...rest } = createBookDto;

    createBookDto.authorId =
      typeof authorId === 'string' ? [authorId] : authorId;

    const queriesValidates = [
      this.repository.book.findFirst({
        where: { name: createBookDto.name },
      }),
      this.repository.author.findMany({
        where: { id: { in: createBookDto.authorId } },
      }),
      this.repository.gender.findUniqueOrThrow({
        where: { id: createBookDto.genderId },
      }),
    ];

    const [bookExists, authorsExists] = await Promise.all(queriesValidates);

    if (bookExists) {
      throw new ConflictException('Book already exists');
    }
    if (
      Array.isArray(authorsExists) &&
      authorsExists.length !== createBookDto.authorId.length
    ) {
      throw new NotFoundException('Author not found');
    }

    createBookDto.imageUrl = await upload(image, 'books');

    const response = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        if (Array.isArray(createBookDto.authorId)) {
          const book = await txtPrisma.book.create({
            data: { ...rest, imageUrl: createBookDto.imageUrl },
          });
          await txtPrisma.authorBook.createMany({
            data: createBookDto.authorId.map(author => ({
              authorId: author,
              bookId: book.id,
            })),
          });
        }
      },
    );

    return response;
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
