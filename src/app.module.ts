import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { GenresModule } from './genres/genres.module';
import { BookModule } from './book/book.module';
import { ThoughtModule } from './thought/thought.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    AuthorModule,
    GenresModule,
    BookModule,
    ThoughtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
