import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { News, NewsItem } from 'src/types';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  //Получение всех новостей
  @Get()
  async getAllNews(): Promise<News[]> {
    return this.newsService.getAllNews();
  }
  //Получение данных для одной странице
  @Get(':id')
  async getNewById(@Param('id') id: string): Promise<NewsItem[]> {
    return this.newsService.getNewById(id);
  }
}
