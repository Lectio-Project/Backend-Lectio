import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptions implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.meta?.cause ?? exception.message;

    switch (exception.code) {
      case 'P2025':
        response.status(404).json({
          statusCode: 404,
          message,
        });
        break;
      case 'P2023':
        response.status(400).json({
          statusCode: 400,
          message: 'Invalid Id',
        });
        break;
      default:
        response.status(500).json({
          statusCode: 500,
          message,
        });
    }
  }
}
