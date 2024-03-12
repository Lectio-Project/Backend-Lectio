/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    private repository: PrismaService,
    private jwt: AuthService,
  ) {}
  selectFields = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };
  async create(createAdminDto: CreateAdminDto) {
    const emailExist = await this.getByEmail(createAdminDto.email);
    if (emailExist) {
      throw new ConflictException('Email ja existe');
    }
    createAdminDto.password = await bcryptjs.hash(createAdminDto.password, 8);

    const { confirmPassword: _, ...rest } = createAdminDto;
    return await this.repository.admin.create({
      data: { ...rest },
      select: this.selectFields,
    });
  }

  async login(loginDto: LoginDto) {
    const admin = await this.getByEmail(loginDto.email);
    if (!admin) {
      throw new ConflictException('Email ou senha invalidos');
    }
    const passwordIsMatch = await bcryptjs.compare(
      loginDto.password,
      admin.password,
    );
    if (!passwordIsMatch) {
      throw new ConflictException('Email ou senha invalidos');
    }
    const token = this.jwt.generateToken(admin);
    const { id, name, email } = admin;
    return {
      id,
      name,
      email,
      token,
    };
  }

  async findAll() {
    return await this.repository.admin.findMany({ select: this.selectFields });
  }

  async findOne(id: string) {
    return await this.repository.admin.findUniqueOrThrow({
      where: { id },
      select: this.selectFields,
    });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.email) {
      if (await this.getByEmail(updateAdminDto.email, id)) {
        throw new ConflictException('Email ja existe');
      }
    }

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcryptjs.hash(updateAdminDto.password, 8);
    }
    const { confirmPassword: _, ...rest } = updateAdminDto;
    return await this.repository.admin.update({
      where: { id },
      data: { ...rest },
      select: this.selectFields,
    });
  }

  async remove(id: string) {
    await this.repository.admin.delete({
      where: { id },
    });
    return;
  }

  private async getByEmail(email: string, id?: string) {
    return await this.repository.admin.findFirst({
      where: {
        email,
        id: { not: id },
      },
    });
  }
}
