import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Comments } from 'src/types';

@Injectable()
export class CommentsService {
  //Трансформация данных
  private transformComments(comments) {
    return comments.map((comment) => {
      const { time_ago, comments_count, ...rest } = comment;
      const transformedComment: Comments = {
        ...rest,
        timeAgo: time_ago,
        commentsCount: comments_count,
        comments: comment.comments
          ? this.transformComments(comment.comments)
          : [],
      };
      return transformedComment;
    });
  }

  async getAllComments(id: number | string) {
    try {
      const response = await axios.get<Comments>(
        `${process.env.API_URL}/item/${id}.json`,
      );
      const { comments } = response.data;
      const rootComments: Comments[] = this.transformComments(comments);
      return rootComments;
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при получении комментариев из внешнего API');
    }
  }
}
