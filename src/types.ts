// Интерфейс получаемых данных с API для главной страницы
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
//(С преобразованием) Тип получаемых данных с API для главной страницы
export type NewsTransform = Omit<
  News,
  'time_ago' | 'comments_count' | 'type' | 'url' | 'domain'
> & {
  timeAgo: string;
  commentsCount: number;
};
// Интерфейс получаемых данных с API для одной новости
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
// (С преобразованием) Тип получаемых данных с API для одной новости
export type NewsItemTransform = Pick<
  NewsItem,
  'id' | 'title' | 'points' | 'user' | 'time' | 'content' | 'url' | 'domain'
> & { timeAgo: string; commentsCount: number };

// Интерфейс получаемых данных с API для коментариев
export type Comments = Omit<
  NewsItem,
  'title' | 'points' | 'url' | 'domain' | 'comments'
> & {
  comments: Comments[];
};

export type CommentsTransform = Omit<
  Comments,
  'time_ago' | 'comments_count' | 'comments'
> & {
  timeAgo: string;
  commentsCount: number;
  comments: CommentsTransform[];
};
