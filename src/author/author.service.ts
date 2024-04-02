import { Injectable, NotFoundException } from '@nestjs/common';
import { SexGender } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import avgGradeCalc from 'src/utils/avgGrade';
import deleteFile from 'src/utils/bucketIntegration/delete';
import upload from 'src/utils/bucketIntegration/upload';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { calculatePagination } from 'src/utils/pagination/pagination-function';

@Injectable()
export class AuthorService {
  constructor(private readonly repository: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto, image: Express.Multer.File) {
    const { genresId, ...rest } = createAuthorDto;

    const queries = [
      upload(image, 'authors'),
      this.repository.gender.findMany({
        where: { id: { in: genresId as Array<string> } },
        select: { id: true, gender: true },
      }),
    ];

    const [imageUrl, genresDb] = await Promise.all(queries);

    if (genresDb.length !== genresId.length) {
      throw new NotFoundException('Gênero não encontrado');
    }

    const response = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        const author = txtPrisma.author.create({
          data: {
            ...rest,
            sexGender:
              createAuthorDto.sexGender === 'male'
                ? SexGender.male
                : SexGender.woman,
            Genders: {
              create: (genresId as Array<string>).map(id => ({
                gender: {
                  connect: {
                    id,
                  },
                },
              })),
            },
            imageUrl: imageUrl as string,
          },
          select: this.selectFieldsResult({ type: 'inserts' }),
        });
        return author;
      },
    );

    return response;
  }

  async findAll(
    genresId?: Array<string>,
    add?: Array<string>,
    page?: number,
    quantityPerPage?: number,
  ) {
    const newAdd = add ? [...new Set([...add])] : [];
    let query = {};

    if (genresId && genresId.length > 0) {
      query['where'] = {
        Genders: {
          some: { gender: { id: { in: genresId as Array<string> } } },
        },
      };
      !newAdd.includes('gender') ? newAdd.push('gender') : null;
    }

    const selectFields =
      newAdd.length > 0
        ? this.selectFieldsResult({
            type: 'fields',
            fields: newAdd,
          })
        : this.selectFieldsResult();

    query = {
      ...query,
      select: selectFields,
    };

    if (page || quantityPerPage) {
      const amountRows = await this.repository.author.count();
      const { skip, take, pagination } = calculatePagination(
        amountRows,
        page,
        quantityPerPage,
      );

      const rows = await this.repository.author.findMany({
        skip,
        take,
      });

      return [pagination, ...rows];
    }

    return await this.repository.author.findMany(query);
  }

  async findOne(id: string, add?: Array<string>) {
    const newAdd = add ? [...new Set([...add])] : null;
    const selectFields = newAdd
      ? this.selectFieldsResult({
          type: 'fields',
          fields: newAdd,
        })
      : this.selectFieldsResult();

    return await this.repository.author.findUniqueOrThrow({
      where: { id },
      select: selectFields,
    });
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
    image: Express.Multer.File,
  ) {
    const { genresId, usersId, grade, ...rest } = updateAuthorDto;
    const queries = [];
    if (image) {
      queries.push(upload(image, 'authors'));
    }
    if (genresId) {
      queries.push(
        this.repository.gender.findMany({
          where: { id: { in: genresId as Array<string> } },
          select: { id: true },
        }),
      );
    }
    if (usersId) {
      queries.push(
        this.repository.user.findMany({
          where: { id: { in: usersId as Array<string> } },
          select: { id: true },
        }),
      );
    }

    const results = await Promise.all(queries);

    let genderDB = [];
    let userDB = [];
    const idUser = usersId && usersId[0];

    results.forEach(value => {
      typeof value === 'string'
        ? (rest['imageUrl'] = value)
        : (userDB = idUser === value[0].id ? value : (genderDB = value));
    });

    if (genderDB && genresId && genderDB.length !== genresId.length) {
      throw new NotFoundException('Gênero não encontrado');
    }
    if (userDB && usersId && userDB.length !== usersId.length) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const author = await this.repository.author.findUnique({
      where: { id },
    });

    let data = { ...rest };
    if (grade) {
      const result = avgGradeCalc(
        +grade,
        author.totalGrade,
        author.counterGrade,
      );
      data = {
        ...data,
        ...result,
      };
    }

    const response = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        const queries = [];
        if (genresId) {
          queries.push(
            txtPrisma.genderAuthor.deleteMany({
              where: {
                authorId: id,
              },
            }),
          );
        }
        if (usersId) {
          queries.push(
            txtPrisma.userAuthor.deleteMany({
              where: {
                authorId: id,
              },
            }),
          );
        }
        await Promise.all(queries);
        const author = txtPrisma.author.update({
          where: { id },
          data: {
            ...data,
            sexGender:
              updateAuthorDto.sexGender === 'male'
                ? SexGender.male
                : SexGender.woman,
            Genders: {
              create: (genresId as Array<string>)?.map(id => ({
                gender: {
                  connect: {
                    id,
                  },
                },
              })),
            },
            Users: {
              create: (usersId as Array<string>)?.map(id => ({
                user: {
                  connect: {
                    id,
                  },
                },
              })),
            },
          },
          select: this.selectFieldsResult({ type: 'inserts' }),
        });
        return author;
      },
    );

    return response;
  }

  async remove(id: string) {
    const imageUrl = await this.repository.$transaction(
      async (txtPrisma: PrismaService) => {
        await txtPrisma.genderAuthor.deleteMany({
          where: { authorId: id },
        });
        const { imageUrl } = await txtPrisma.author.delete({
          where: { id },
          select: { imageUrl: true },
        });
        return imageUrl;
      },
    );

    deleteFile(imageUrl, 'authors');

    return;
  }

  private selectFieldsResult(options?: {
    type?: 'inserts' | 'fields';
    fields?: Array<string>;
  }) {
    let selectFields: any = {
      id: true,
      name: true,
      imageUrl: true,
      birthplace: true,
      carrerDescription: true,
      createdAt: true,
      updatedAt: true,
      totalGrade: true,
      counterGrade: true,
      avgGrade: true,
    };

    if (!options) {
      return selectFields;
    }

    const { type, fields } = options;

    if (type === 'inserts' || fields.includes('gender')) {
      selectFields = {
        ...selectFields,
        Genders: { select: { gender: true } },
      };
    }

    if (type === 'fields' && fields.includes('book')) {
      selectFields = {
        ...selectFields,
        AuthorBook: {
          select: {
            book: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                avgGrade: true,
                counterGrade: true,
                gender: {
                  select: {
                    id: true,
                    gender: true,
                  },
                },
              },
            },
          },
        },
      };
    }

    if (type === 'fields' && fields.includes('user')) {
      selectFields = {
        ...selectFields,
        Users: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                imageUrl: true,
              },
            },
          },
        },
      };
    }

    this.repository.author.findMany({
      select: { Genders: { select: { gender: true } } },
    });

    return selectFields;
  }
}
