import { Comments } from 'src/types';
export declare class CommentsService {
    private transformComments;
    getAllComments(id: number | string): Promise<Comments[]>;
}
