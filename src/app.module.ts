import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CatchEverythingFilter } from 'src/shared/filters/catch-everything.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { AuthModule } from './routes/auth/auth.module';
import { PostsModule } from './routes/posts/posts.module';
import './shared/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ConfigModule.forRoot(), PostsModule, SharedModule, AuthModule, ProductsModule],
  controllers: [AppController, ProductsController],
  providers: [
    AppService,
    {
        
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor

    },
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    ProductsService,
  ],
})
export class AppModule {}
