import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { PrismaModule } from './prisma/prisma.module'
import { envSchema } from './env'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
