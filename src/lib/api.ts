import { getURLParams } from "@/components/util/formats";
import { GetArticle, ArticleInput, CategoryInput, Category } from "./type";
const API_HOST = process.env.API_HOST || "https://test-fe.mysellerpintar.com";

export async function getArticles(q?: {
  page?: string;
  category?: string;
  limit?: string;
  search?: string;
}) {
  const res = await fetch(`${API_HOST}/api/articles?${getURLParams(q ?? {})}`, {
    cache: "no-store", // tidak cache
    headers: {
      "Content-Type": "application/json",
    },
  });
  const articles: GetArticle = await res.json();

  return articles;
}

export async function getArticleById(id: string) {
  const res = await fetch(`${API_HOST}/api/articles/${id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  const article = await res.json();
  return article;
}

export async function createArticle(data: ArticleInput) {
  const res = await fetch(`${API_HOST}/api/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create article");
  }
  const article = await res.json();
  return article;
}

export async function updateArticle(id: string, data: ArticleInput) {
  const res = await fetch(`${API_HOST}/api/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update article");
  }
  const article = await res.json();
  return article;
}

export async function deleteArticle(id: string) {
  const res = await fetch(`${API_HOST}/api/articles/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete article");
  }
  return true;
}

export async function getCategories(q?: {
  page?: string;
  limit?: string;
  search?: string;
}) {
  const res = await fetch(
    `${API_HOST}/api/categories?${getURLParams(q ?? {})}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data: { data: Category[]; total: number; page: number; limit: number } =
    await res.json();
  return data;
}

export async function createCategory(data: CategoryInput) {
  const res = await fetch(`${API_HOST}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create category");
  }
  const category = await res.json();
  return category;
}

export async function updateCategory(id: string, data: CategoryInput) {
  const res = await fetch(`${API_HOST}/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update category");
  }
  const category = await res.json();
  return category;
}
