import 'express';

interface Props {
  id: string;
  email: string;
  name: string;
}

declare module 'express' {
  interface Request {
    user: Props;
    admin: Props;
  }
}
