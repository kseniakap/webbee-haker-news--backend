export interface News {
    id: number;
    title: string;
    points?: number | null;
    user?: string | null;
    time: number;
    time_ago: string;
    comments_count: number;
    type: string;
    url?: string;
    domain?: string;
}
export type NewsTransform = Omit<News, 'time_ago' | 'comments_count'> & {
    timeAgo: string;
    commentsCount: number;
};
export interface NewsItem {
    id: number;
    title: string;
    points: number | null;
    user: string | null;
    time: number;
    time_ago: string;
    content: string;
    deleted?: boolean;
    dead?: boolean;
    type: string;
    url?: string;
    domain?: string;
    comments: NewsItem[];
    level?: number;
    comments_count: number;
    open?: boolean;
}
export type NewsItemTransform = Pick<NewsItem, 'id' | 'title' | 'points' | 'user' | 'time' | 'content' | 'url' | 'domain'> & {
    timeAgo: string;
    commentsCount: number;
};
export interface Comments extends NewsItem {
}
export type CommentsTransform = Omit<NewsItem, 'time_ago' | 'comments_count'> & {
    timeAgo: string;
    commentsCount: number;
    comments: CommentsTransform[];
};
