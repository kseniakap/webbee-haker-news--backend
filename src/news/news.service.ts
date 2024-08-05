import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { News, NewsItem, NewsItemTransform } from 'src/types';

@Injectable()
export class NewsService {
  //Получение данных с одной страницы
  async getAllNewsOnePage(page: number) {
    try {
      const response = await axios.get<News[]>(
        `${process.env.API_URL}newest/${page}.json`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при получении данных из внешнего API');
    }
  }

  //Получение 100 новостей
  async getAllNews() {
    try {
      const n = Math.ceil(100 / 30);

      const promises = [];
      for (let i = 1; i <= n; i++) {
        promises.push(this.getAllNewsOnePage(i));
      }

      const limitedResults = (await Promise.all(promises))
        .flatMap((result) => result)
        .slice(0, 100);

      return limitedResults.map((news) => ({
        id: news.id,
        title: news.title,
        points: news.points,
        user: news.user,
        time: news.time,
        timeAgo: news.time_ago,
        commentsCount: news.comments_count,
        type: news.type,
        url: news.url,
        domain: news.domain,
      }));
    } catch (error) {
      throw new Error('Ошибка при получении 100 новостей из внешнего API');
    }
  }

  //Получение данных для одной новости
  async getNewById(id: number | string) {
    try {
      const response = await axios.get<NewsItem>(
        `${process.env.API_URL}/item/${id}.json`,
      );
      const newData = response.data;
      const transformedData: NewsItemTransform = {
        id: newData.id,
        title: newData.title,
        points: newData.points,
        user: newData.user,
        time: newData.time,
        timeAgo: newData.time_ago,
        content: newData.content,
        commentsCount: newData.comments_count,
      };
      return transformedData;
    } catch (error) {
      throw new Error(
        'Ошибка при получении данных для одной записи из внешнего API',
      );
    }
  }
}
