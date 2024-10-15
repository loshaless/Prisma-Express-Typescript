import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API endpoints for managing posts
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: false
 *         schema:
 *           type: string
 *         description: jwt token get from login endpoint
 *     responses:
 *       200:
 *         description: A list of posts
 *       500:
 *         description: Internal server error
 */
router.get('/', (req, res, next) => {
  res.send('Hello World');
});

export default router;