import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NewsService {
  //Получение данных с одной страницы
  async getAllNewsOnePage(page: number) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}newest/${page}.json`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
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

      const results = await Promise.all(promises);
      const flattenedResults = results.flatMap((result) => result);
      const limitedResults = flattenedResults.slice(0, 100);
      return limitedResults.map((news) => ({
        id: news.id,
        title: news.title,
        points: news.points,
        user: news.user,
        time: news.time,
        time_ago: news.time_ago,
        comments_count: news.comments_count,
        type: news.type,
        url: news.url,
        domain: news.domain,
      }));
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при получении данных из внешнего API');
    }
  }

  //Получение данных для одной странице
  async getNewById(id: number | string) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/item/${id}.json`,
      );
      const newData = response.data;
      const { comments, ...items } = newData;
      return items;
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при получении данных из внешнего API');
    }
  }
}
