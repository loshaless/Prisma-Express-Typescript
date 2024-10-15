import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import userController from '../controllers/userController';

const router = Router();

/**
* @swagger
* tags:
*   name: Users
*   description: API endpoints for managing users
* /api/v1/users:
*   post:
*     summary: Create a new user
*     tags: [Users]
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
router.post('/users', authenticate, userController.createUser);

// Implement other CRUD routes similarly

export default router;