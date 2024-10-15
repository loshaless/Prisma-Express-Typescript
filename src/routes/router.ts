import express from 'express';
import userRoutes from './userRoutes';
import { versionHandler } from '../middlewares/versionHandler';

const router = express.Router();

router.use('/api/users', versionHandler, userRoutes);

export default router;