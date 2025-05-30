import axios from "axios";
import { getURLParams } from "src/components/util/formats";
import { ArticleInput, CategoryInput, GetArticle, GetCategory } from "./type";

const API_HOST = process.env.API_HOST || "https://test-fe.mysellerpintar.com";

const axiosInstance = axios.create({
  baseURL: API_HOST,
  headers: { "Content-Type": "application/json" },
});

export async function getArticles(q?: {
  page?: string;
  category?: string;
  limit?: string;
  search?: string;
}) {
  const res = await axiosInstance.get(`/api/articles?${getURLParams(q ?? {})}`);
  return res.data as GetArticle;
}

export async function getArticleById(id: string) {
  const res = await axiosInstance.get(`/api/articles/${id}`);
  if (res.status !== 200) {
    throw new Error("Failed to fetch article");
  }
  return res.data;
}

export async function createArticle(data: ArticleInput) {
  console.log({ data });
  const res = await axiosInstance.post("/api/articles", data);
  if (res.status !== 201) {
    throw new Error("Failed to create article");
  }
  return res.data;
}

export async function updateArticle(id: string, data: ArticleInput) {
  const res = await axiosInstance.put(`/api/articles/${id}`, data);
  if (res.status !== 200) {
    throw new Error("Failed to update article");
  }
  return res.data;
}

export async function deleteArticle(id: string) {
  const res = await axiosInstance.delete(`/api/articles/${id}`);
  if (res.status !== 200) {
    throw new Error("Failed to delete article");
  }
  return true;
}

export async function getCategories(q?: {
  page?: string;
  limit?: string;
  search?: string;
}) {
  const { data, status } = await axiosInstance.get<GetCategory>(
    `/api/categories?${getURLParams(q ?? {})}`
  );
  if (status !== 200) {
    throw new Error("Failed to fetch categories");
  }
  return data;
}

export async function createCategory(data: CategoryInput) {
  const res = await axiosInstance.post("/api/categories", data);
  if (res.status !== 201) {
    throw new Error("Failed to create category");
  }
  return res.data;
}

export async function updateCategory(id: string, data: CategoryInput) {
  const res = await axiosInstance.put(`/api/categories/${id}`, data);
  if (res.status !== 200) {
    throw new Error("Failed to update category");
  }
  return res.data;
}
