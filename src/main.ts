import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Env } from './env'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  app.enableCors()

  await app.listen(port)
}
bootstrap()
