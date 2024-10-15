import { HttpStatusCode } from "../utils/httpStatusCodes";
import { CustomResponse } from '../utils/customResponse';
import { NextFunction } from 'express';
import postService from '../services/postService';
import { Request } from 'express';
import { CustomError } from "../utils/customError";
import { CreatePostRequestDTO, CreatePostResponseDTO, getPostResponseDTO, UpdatePostRequestDTO } from "../dtos/postDTO";
import { CustomRequest } from "../utils/customRequest";
import userService from "../services/userService";

class PostController {
  async getPosts(req: Request, res: CustomResponse<getPostResponseDTO[]>, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const posts = await postService.getPosts(page, limit);
      const response: getPostResponseDTO[] = posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }));
      
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req: Request, res: CustomResponse, next: NextFunction) {
    try {
      const post = await postService.getPostById(parseInt(req.params.id));

      if (!post) {
        throw new CustomError('Post not found', HttpStatusCode.NOT_FOUND);
      }

      res.status(HttpStatusCode.OK).json(post);
    } catch (error) {
      next(error);
    }
  }
  
  async createPost(req: CustomRequest<CreatePostRequestDTO>, res: CustomResponse<CreatePostResponseDTO>, next: NextFunction) {
    try {
      const user = await userService.getUserByEmail(req.jwt?.email as string)
      if (!user) {
        throw new CustomError('User not found', HttpStatusCode.NOT_FOUND);
      }

      const post = await postService.createPost(req.body, user.id);
      res.status(HttpStatusCode.CREATED).json({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req: CustomRequest<UpdatePostRequestDTO>, res: CustomResponse, next: NextFunction) {
    try {
      const post = await postService.updatePost(parseInt(req.params.id), req.body);
      res.status(HttpStatusCode.OK).json(post);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: Request, res: CustomResponse, next: NextFunction) {
    try {
      await postService.deletePost(parseInt(req.params.id));
      res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}

const postController = new PostController();
export default postController;
