import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, GenresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
