import { User } from '../models/userModel';
import { CreateUserDTO } from '../dtos/userDTO';
import { User as UserType } from '@prisma/client';

export function createUser(data: CreateUserDTO): Promise<UserType> {
  return User.create({ data });
}

export function getUserByEmail(email: string): Promise<UserType | null> {
  return User.findUnique({ where: { email } });
}

// Implement other CRUD operations similarly