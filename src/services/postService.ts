import { Post as PostType } from '@prisma/client';
import { Post } from '../models/postModel';
import { CreatePostRequestDTO, UpdatePostRequestDTO } from '../dtos/postDTO';
import prisma from '../models/prisma';
import { Operation } from '../constant/tableName';
import auditService from './auditService';
import { TableName } from '../constant/tableName';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { CustomError } from '../utils/customError';

interface PostWithAuthor extends PostType {
  author: {
    email: string;
  };
}

class PostService {
  /* get all post with the author email with pagination */
  getPosts(page: number, limit: number) : Promise<PostWithAuthor[]> {
    return Post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: {
          select: {
            email: true
          }
        }
      }
    });
  }

  /* get post by id */
  getPostById(id: number) : Promise<PostType | null> {
    return Post.findUnique({ where: { id } });
  }

  /* create post */
  async createPost(data: CreatePostRequestDTO, authorId: number) : Promise<PostType> {
    return prisma.$transaction(async (prisma) => {
      const post = await prisma.post.create({ data: { ...data, authorId } });

      auditService.log({
        tableName: TableName.POST,
        operation: Operation.CREATE,
        newValues: post,
        userId: authorId
      });

      return post;
    });
  }

  /* update post */
  updatePost(id: number, data: UpdatePostRequestDTO, idWhoUpdate: number) : Promise<PostType> {
    return prisma.$transaction(async (prisma) => {
      /* check if post exist */
      const existingPost = await postService.getPostById(id);
      if (!existingPost) {
        throw new CustomError('Post not found', HttpStatusCode.NOT_FOUND);
      }

      const updatedPost = await prisma.post.update({ where: { id }, data });

      auditService.log({
        tableName: TableName.POST,
        operation: Operation.UPDATE,
        oldValues: existingPost,
        newValues: updatedPost,
        userId: idWhoUpdate
      });

      return updatedPost;
    });
  }

  /* delete post */
  deletePost(id: number, idWhoDelete: number) : Promise<PostType> {
    return prisma.$transaction(async (prisma) => {
      const post = await prisma.post.delete({ where: { id } });
      if (!post) {
        throw new CustomError('Post not found', HttpStatusCode.NOT_FOUND);
      }

      auditService.log({
        tableName: TableName.POST,
        operation: Operation.DELETE,
        oldValues: post,
        userId: idWhoDelete
      });

      return post;
    });
  }
}

const postService = new PostService();
export default postService;