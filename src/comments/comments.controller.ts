import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from 'src/types';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  // Получение только корневых комментариев
  @Get('root/:id')
  async getRootComments(@Param('id') id: string): Promise<Comments[]> {
    return this.commentsService.getRootComments(id);
  }

  // Получение вложенных комментариев
  @Get('children/:id')
  async getChildrenComments(@Param('id') id: string): Promise<Comments[]> {
    return this.commentsService.getChildrenComments(id);
  }
}
