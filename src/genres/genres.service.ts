import { ConflictException, Injectable } from '@nestjs/common';
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

    return await this.repository.gender.create({
      data: {
        gender: createGenreDto.gender,
      },
      select: {
        id: true,
        gender: true,
      },
    });
  }

  async findAll() {
    return await this.repository.gender.findMany();
  }

  async findOne(id: string) {
    return await this.repository.gender.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const gender = await this.getByName(updateGenreDto.gender, id);

    if (gender) {
      throw new ConflictException('Gender already exists');
    }

    return await this.repository.gender.update({
      data: {
        gender: updateGenreDto.gender,
      },
      where: {
        id,
      },
      select: {
        id: true,
        gender: true,
      },
    });
  }

  async remove(id: string) {
    await this.repository.gender.delete({
      where: {
        id,
      },
    });
  }

  private async getByName(name: string, id?: string) {
    return await this.repository.gender.findFirst({
      where: {
        gender: name,
        id: { not: id },
      },
    });
  }
}
