import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostBodyDto, type UpdatePostBodyDto } from 'src/routes/posts/post.dto';
import { isNotFoundPrismaError } from 'src/shared/helpers';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getPosts( userId: number) {
    return await this.prismaService.post.findMany(
        {
            where:{
                authorId: userId
            },
            include: {
                author: {
                    omit: {
                        password:true
                    }
                }
            }
        }
    );
  }
  async createPost(body: CreatePostBodyDto, userId: number) {
    return await this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
      include: {
        author: {
            omit: {
                password: true
            }
        }
      }
    });
  }
  async getPost(postId: number) {
            try {
            return  await this.prismaService.post.findUniqueOrThrow(
        {
            where:{
             id: postId
            },
            include: {
                author: {
                    omit: {
                        password:true
                    }
                }
            }
        }
    );
    } catch (error) {
        if (isNotFoundPrismaError(error)) {
            throw new NotFoundException(`Post with id ${postId} not found`);
        }
        throw error;
        
    }
  }
 async updatePost({postId, body, userId}: {postId: number, body: UpdatePostBodyDto, userId: number}) {
    try {
    return  await this.prismaService.post.update({
            where: {
                id: +postId,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
    } catch (error) {
        if (isNotFoundPrismaError(error))  {
            throw new NotFoundException(`Post not found or you are not the author of this post`);
        }
        throw error;
        
    }
  }
  async deletePost(id: string,userId: number): Promise<string> {
    try {
       await this.prismaService.post.delete({
            where: {
                id: +id,
                authorId: userId
            }
        });
    } catch (error) {
        if (isNotFoundPrismaError(error)) {
            throw new NotFoundException(`Post with id ${id} not found or you are not the author of this post`);
        }
        throw error;
        
    }
    return `post with ${id} was deleted`;
  }
}
