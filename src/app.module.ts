import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { GenresModule } from './genres/genres.module';
import { BookModule } from './book/book.module';
import { CommentsModule } from './comments/comments.module';
import { ThoughtModule } from './thought/thought.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    AuthorModule,
    GenresModule,
    BookModule,
    CommentsModule,
    ThoughtModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
