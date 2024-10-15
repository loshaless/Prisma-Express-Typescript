import express from 'express';
import userRoutes from './userRoutes';
import { versionHandler } from '../middlewares/versionHandler';
import { authenticate } from '../middlewares/authMiddleware';
import postRoutes from './postRoutes';

const router = express.Router();

router.use('/api/users', versionHandler, userRoutes);
router.use('/api/posts', versionHandler, authenticate, postRoutes);
export default router;