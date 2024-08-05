import { NewsService } from './news.service';
import { NewsItemTransform, NewsTransform } from 'src/types';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getAllNews(): Promise<NewsTransform[]>;
    getNewById(id: string): Promise<NewsItemTransform>;
}
