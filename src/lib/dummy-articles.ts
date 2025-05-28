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
    "data": Article[],
    "total": number
    "page": number
    "limit": number
}

export const dummyArticles: Article[] = [
  {
    id: "5c2c9234-e00d-47f6-b301-17bc6a052af1",
    userId: "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
    categoryId: "",
    title: "negara wilayah barat  sedang mengalami inflasi",
    content: "<p>selama ini negara barat menjadi sebuah negara terhebat namun mengalami inflasi yang sangat besar</p><p></p><p><strong>wow mang ea dek?</strong></p>",
    imageUrl: "https://s3.sellerpintar.com/articles/articles/1746941028539-Image-header-articles.jpg",
    createdAt: "2025-05-11T05:20:22.994Z",
    updatedAt: "2025-05-12T03:44:30.972Z",
    category: {
      id: "",
      userId: "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
      name: "Management",
      createdAt: "2025-05-10T18:38:02.392Z",
      updatedAt: "2025-05-10T18:38:02.392Z",
    },
    user: {
      id: "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
      username: "testlagiadmin",
    },
  },
  // tambahkan beberapa artikel lagi dengan kategori berbeda
];