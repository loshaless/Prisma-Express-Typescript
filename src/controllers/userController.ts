import { NextFunction } from 'express';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import userService from '../services/userService';
import { CustomError } from '../utils/customError';
import { CreateUserRequestDTO, CreateUserResponseDTO, LoginRequestDTO, LoginResponseDTO } from '../dtos/userDTO';
import { CustomRequest } from '../utils/customRequest';
import { CustomResponse } from '../utils/customResponse';
import { compare, hash } from '../helper/bcrypt';
import { generateToken } from '../helper/jwt';
import { generateSalt } from '../helper/general';
import { User } from '@prisma/client';

class UserController {
  async registerUser(req: CustomRequest<CreateUserRequestDTO>, res: CustomResponse<CreateUserResponseDTO>, next: NextFunction): Promise<void> {
    try {
      // get user data to check if user already exists
      const user = await userService.getUserByEmail(req.body.email);
      if (user) {
        throw new CustomError('User already exists', HttpStatusCode.BAD_REQUEST);
      }

      // create user
      const salt = generateSalt(12);
      const hashedPassword = hash(req.body.password + salt);
      const createdUser = await userService.createUser({...req.body, password: hashedPassword}, salt);
      res.status(HttpStatusCode.CREATED).json(
        { 
          email: createdUser.email
        }
      );
    } catch (error){
      next(error)
    }
  }

  async login(req: CustomRequest<LoginRequestDTO>, res: CustomResponse<LoginResponseDTO>, next: NextFunction) {
    try {
      const user: User | null = await userService.getUserByEmail(req.body.email);
      if (!user) {
        throw new CustomError('User not found', HttpStatusCode.NOT_FOUND);
      }

      const isPasswordCorrect = compare(req.body.password + user.salt, user.password);
      if (!isPasswordCorrect) {
        throw new CustomError('Invalid password', HttpStatusCode.UNAUTHORIZED);
      }
      const token = generateToken({email: user.email});
      res.status(HttpStatusCode.OK).json({
        token: token,
        email: user.email
      });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController()
export default userController;
