import { authenticate } from '../middlewares/authMiddleware';
import userController from '../controllers/userController';
import { NextFunction, Router } from 'express';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { CreateUserRequestDTO, CreateUserResponseDTO } from '../dtos/userDTO';
import { CustomRequest } from '../utils/customRequest';
import { CustomResponse } from '../utils/customResponse';
import { CustomError } from '../utils/customError';

const router = Router();

/**
* @swagger
* tags:
*   name: Users
*   description: API endpoints for managing users
* /api/users:
*   post:
*     summary: Create a new user
*     tags: [Users]
*     parameters:
*       - in: header
*         name: accept-version
*         required: false
*         schema:
*           type: string
*         description: Version of the API to use
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*     responses:
*       201:
*         description: User created successfully
*         content:
*           application/json:
*             schema: 
*               type: object    
*               properties:
*                 email:
*                   type: string
*/
router.post('', authenticate, (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  switch (req.version) {
    case '1.0':
      userController.createUser(req, res, next);
      break;
    default:
      next(new CustomError('Version not supported', HttpStatusCode.BAD_REQUEST));
  }
});

export default router;