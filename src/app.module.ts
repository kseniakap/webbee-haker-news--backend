import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    NewsModule,
    CommentsModule,
  ],
})
export class AppModule {}
