import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsItemTransform, NewsTransform } from 'src/types';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  //Получение всех новостей для главной страницы
  @Get()
  async getAllNews(): Promise<NewsTransform[]> {
    return this.newsService.getAllNews();
  }
  //Получение данных для одной новости
  @Get(':id')
  async getNewById(@Param('id') id: string): Promise<NewsItemTransform> {
    return this.newsService.getNewById(id);
  }
}
