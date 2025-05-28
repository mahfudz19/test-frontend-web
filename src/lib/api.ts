// src/lib/api.ts
import { getURLParams } from "@/components/util/formats";
import { GetArticle } from "./type";
const API_HOST = process.env.API_HOST || "https://test-fe.mysellerpintar.com";

export async function getArticles(q?: {
  page?: string;
  category?: string;
  limit?: string;
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
