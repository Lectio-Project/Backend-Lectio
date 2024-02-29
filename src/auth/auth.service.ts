import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
dotenv.config();

interface JwtPayload {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  private readonly secretKey = process.env.JWT_SECRET_KEY;
  generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '7d' });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secretKey) as JwtPayload;
  }
}
