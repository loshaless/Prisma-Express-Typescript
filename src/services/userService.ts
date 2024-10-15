import { User } from '../models/userModel';
import { CreateUserRequestDTO } from '../dtos/userDTO';
import { User as UserType } from '@prisma/client';

class UserService {
  createUser(data: CreateUserRequestDTO): Promise<UserType> {
    return User.create({ data });
  }

  getUserByEmail(email: string): Promise<UserType | null> {
    return User.findUnique({ where: { email } });
  }
}

const userService = new UserService();
export default userService