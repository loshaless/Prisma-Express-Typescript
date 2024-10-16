import { Post as PostType } from '@prisma/client';
import { Post } from '../models/postModel';
import { CreatePostRequestDTO, UpdatePostRequestDTO } from '../dtos/postDTO';

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
  createPost(data: CreatePostRequestDTO, authorId: number) : Promise<PostType> {
    return Post.create({ data: { ...data, authorId } });
  }

  /* update post */
  updatePost(id: number, data: UpdatePostRequestDTO) : Promise<PostType> {
    return Post.update({ where: { id }, data });
  }

  /* delete post */
  deletePost(id: number) : Promise<PostType> {
    return Post.delete({ where: { id } });
  }
}

const postService = new PostService();
export default postService;