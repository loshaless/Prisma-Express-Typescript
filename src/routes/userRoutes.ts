import { Router } from 'express';
import { createUserController } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/users', authenticate, createUserController);

// Implement other CRUD routes similarly

export default router;