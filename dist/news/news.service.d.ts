import { News, NewsItemTransform } from 'src/types';
export declare class NewsService {
    getAllNewsOnePage(page: number): Promise<News[]>;
    getAllNews(): Promise<{
        id: any;
        title: any;
        points: any;
        user: any;
        time: any;
        timeAgo: any;
        commentsCount: any;
        type: any;
        url: any;
        domain: any;
    }[]>;
    getNewById(id: number | string): Promise<NewsItemTransform>;
}
