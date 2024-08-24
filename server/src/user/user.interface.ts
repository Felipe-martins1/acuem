import { User } from './user.entity';

export interface ILoginData {
  token: string;
  user: User;
}
