import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreatePostBodyDto, GetPostItemDto, UpdatePostBodyDto } from 'src/routes/posts/post.dto';
import { PostsService } from 'src/routes/posts/posts.service';
import { AuthType } from 'src/shared/constants/auth.constant';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { logPrettier } from 'src/shared/utils/global';
@Controller('posts')
@Auth([AuthType.Bearer])

export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // @UseGuards(APIKeyGuard)
//   @Auth([AuthType.Bearer, AuthType.ApiKey], {
//     condition: ConditionGuard.Or,
//   })
  @Get()
 async getPosts(@ActiveUser('userId') userId: number) {
    const posts =  await this.postsService.getPosts(userId);  
        if (!posts) {
            throw new Error('Posts not found');
        }

    return posts.map((post) => new GetPostItemDto(post));
  } 
  @Post()
  async createPost(@Body() body: CreatePostBodyDto, @ActiveUser('userId') userId: number) {
    logPrettier(body, 'Create post body');
    return new GetPostItemDto( await this.postsService.createPost(body, userId));
  }

  @Get(':id')
//   @Auth([AuthType.Bearer])
 async getPost(@Param('id') postId: string) {
    return new GetPostItemDto( await this.postsService.getPost(+postId));
  }

  @Put(':id')
//   @Auth([AuthType.Bearer])
 async updatePost(@Param('id') postId: string, @Body() body: UpdatePostBodyDto, @ActiveUser('userId') userId: number) {
    logPrettier({postId, body, userId}, 'Update post params');
    return await this.postsService.updatePost({postId: +postId, body, userId});
  }
  @Delete(':id')
 async deletePost(@Param('id') postId: string, @ActiveUser('userId') userId: number) {
    return await this.postsService.deletePost(postId, userId);
  }
}
