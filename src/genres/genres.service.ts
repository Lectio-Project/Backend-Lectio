import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private readonly repository: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    const gender = await this.getByName(createGenreDto.gender);

    if (gender) {
      throw new ConflictException('Gender already exists');
    }

    await this.repository.gender.create({
      data: {
        gender: createGenreDto.gender,
      },
    });

    return;
  }

  async findAll() {
    return await this.repository.gender.findMany();
  }

  async findOne(id: string) {
    const gender = await this.repository.gender.findUnique({
      where: {
        id,
      },
    });

    if (!gender) {
      throw new NotFoundException('Gender not found');
    }

    return gender;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    await this.findOne(id);

    const gender = await this.getByName(updateGenreDto.gender, id);

    if (gender) {
      throw new ConflictException('Gender already exists');
    }

    await this.repository.gender.update({
      data: {
        gender: updateGenreDto.gender,
      },
      where: {
        id,
      },
    });

    return;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.repository.gender.delete({
      where: {
        id,
      },
    });

    return;
  }

  private async getByName(name: string, id?: string) {
    const gender = await this.repository.gender.findFirst({
      where: {
        gender: name,
        id: { not: id },
      },
    });

    return gender;
  }
}
