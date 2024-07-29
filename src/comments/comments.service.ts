import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CommentsService {
  // Получение только корневых комментариев
  async getRootComments(id: number | string) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/item/${id}.json`,
      );
      const newData = response.data;
      const { comments } = newData;

      const rootComments = comments.filter((comment) => {
        if (comment.level === 0) {
          comment.comments = [];
          return true;
        }
        return false;
      });
      return rootComments;
    } catch (error) {
      console.error(error);
      throw new Error(
        'Ошибка при получении вложенных комментариев из внешнего API',
      );
    }
  }
  // Получение вложенных комментариев
  async getChildrenComments(id: number | string) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/item/${id}.json`,
      );
      const comments = response.data.comments;
      //Получение вложенных комментариев
      const secondLevelComments = comments.filter(
        (comment) => comment.level === 0,
      );
      return secondLevelComments;
    } catch (error) {
      console.error(error);
      throw new Error(
        'Ошибка при получении вложенных комментариев из внешнего API',
      );
    }
  }
}
// async getChildrenComments(id: number | string) {
//   try {
//     const response = await axios.get(
//       `${process.env.API_URL}/item/${id}.json`,
//     );
//     const comments = response.data.comments;
//     //Получение вложенных комментариев
//     const childrenComments = comments.filter(
//       (comment) => comment.level === 0,
//     );
//     return childrenComments;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       'Ошибка при получении вложенных комментариев из внешнего API',
//     );
//   }
// }

// async getComments(id: number | string) {
//   try {
//     const response = await axios.get(
//       `${process.env.API_URL}/item/${id}.json`,
//     );
//     const comments = response.data.comments;
//     //Получение вложенных комментариев
//     const secondLevelComments = comments.filter(
//       (comment) => comment.level === 0,
//     );
//     return secondLevelComments;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       'Ошибка при получении вложенных комментариев из внешнего API',
//     );
//   }
// }
