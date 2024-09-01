import { User } from 'src/modules/user/user.entity';

export type JWTUser = {
  email: string;
  exp: number;
  id: string;
  username: string;
  type: User['type'];
};
