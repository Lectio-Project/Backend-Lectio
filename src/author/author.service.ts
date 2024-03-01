import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import deleteFile from 'src/utils/bucketIntegration/delete';
import upload from 'src/utils/bucketIntegration/upload';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly repository: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto, image: Express.Multer.File) {
    createAuthorDto.imageUrl = await upload(image, 'authors');

    return await this.repository.author.create({ data: createAuthorDto });
  }

  async findAll() {
    return await this.repository.author.findMany();
  }

  async findOne(id: string) {
    return await this.repository.author.findUniqueOrThrow({ where: { id } });
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
    image: Express.Multer.File,
  ) {
    if (image) {
      updateAuthorDto.imageUrl = await upload(image, 'authors');
    }
    return await this.repository.author.update({
      where: { id },
      data: updateAuthorDto,
    });
  }

  async remove(id: string) {
    const { imageUrl } = await this.repository.author.findUniqueOrThrow({
      where: { id },
      select: { imageUrl: true },
    });
    deleteFile(imageUrl, 'authors');

    await this.repository.author.delete({ where: { id } });

    return;
  }
}
