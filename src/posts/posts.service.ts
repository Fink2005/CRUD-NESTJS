import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getPosts() {
    return 'All posts';
  }
  createPost(body: any) {
    return body;
  }
  getPost(id: string) {
    return `Post ${id}`;
  }
  updatePost(id: string, body: any) {
    return `Updated post ${id} with ${body.email}`;
  }
  deletePost(id: string) {
    return `post with ${id} was deleted`;
  }
}
