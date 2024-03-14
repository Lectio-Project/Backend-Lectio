import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwt: AuthService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      const { id } = this.jwt.verifyToken(token);
      request.admin = await this.prisma.admin.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
