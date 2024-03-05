import 'express';

interface User {
  id: string;
  email: string;
  name: string;
}

declare module 'express' {
  interface Request {
    user: User;
  }
}
