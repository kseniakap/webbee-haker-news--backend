import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Получение всех комментариев
  @Get('/:id')
  async getAllComments(@Param('id') id: string) {
    return this.commentsService.getAllComments(id);
  }
}
