import { User } from '../models/userModel';
import { CreateUserDTO } from '../dtos/userDTO';

export const createUser = async (data: CreateUserDTO) => {
  const user = await User.create({ data });
  return user;
};

// Implement other CRUD operations similarly