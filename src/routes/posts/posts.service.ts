import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getPosts() {
    return await this.prismaService.post.findMany();
  }
  async createPost(body: any) {
    const userId = 1;
    return await this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
  }
  async getPost(id: string) {
    return await this.prismaService.post.findUnique({ where: { id: +id } });
  }
  updatePost(id: string, body: any) {
    return `Updated post ${id} with ${body.email}`;
  }
  deletePost(id: string) {
    return `post with ${id} was deleted`;
  }
}
