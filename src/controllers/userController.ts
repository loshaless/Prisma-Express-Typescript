import { NextFunction } from 'express';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import userService from '../services/userService';
import { CustomError } from '../utils/customError';
import { CreateUserRequestDTO, CreateUserResponseDTO } from '../dtos/userDTO';
import { CustomRequest } from '../utils/customRequest';
import { CustomResponse } from '../utils/customResponse';

class UserController {
  async createUser(req: CustomRequest<CreateUserRequestDTO>, res: CustomResponse<CreateUserResponseDTO>, next: NextFunction): Promise<void> {
    try {
      // get user data to check if user already exists
      const user = await userService.getUserByEmail(req.body.email);
      if (user) {
        throw new CustomError('User already exists', HttpStatusCode.BAD_REQUEST);
      }
      // create user
      const createdUser = await userService.createUser(req.body);
      res.status(HttpStatusCode.CREATED).json(
        { 
          email: createdUser.email
        }
      );
    } catch (error){
      next(error)
    }
  }
}

const userController = new UserController()
export default userController;
