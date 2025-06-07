import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
