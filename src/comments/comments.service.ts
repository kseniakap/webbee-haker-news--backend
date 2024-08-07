import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Comments, CommentsTransform } from 'src/types';

@Injectable()
export class CommentsService {
  //Трансформация данных
  private transformComments(comments: Comments[]): CommentsTransform[] {
    return comments.map((comment: Comments) => {
      const { time_ago, comments_count, ...rest } = comment;
      const transformedComment: CommentsTransform = {
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
      return this.transformComments(comments);
    } catch (error) {
      throw new Error('Ошибка при получении комментариев из внешнего API');
    }
  }
}
