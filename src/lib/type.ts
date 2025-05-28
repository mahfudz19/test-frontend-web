export interface Category {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
}

export interface Article {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user: User;
}

export interface GetArticle {
  data: Article[];
  total: number;
  page: number;
  limit: number;
}

export interface ArticleInput {
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface CategoryInput {
  userId: string;
  name: string;
}
