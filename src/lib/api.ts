// src/lib/api.ts
import axios from 'axios';
import { Article, dummyArticles } from './dummy-articles';

const api = axios.create({
  baseURL: 'https://test-fe.mysellerpintar.com/api',
  timeout: 5000,
});

const BASE_URL = 'https://test-fe.mysellerpintar.com/api';

export async function fetchArticles(): Promise<Article[]> {
  try {
    const res = await api.get(`${BASE_URL}/articles`);
    console.log(res.data)
    return res.data;
  } catch (err) {
    // fallback pakai dummy
    console.warn('Fetch API gagal, fallback ke dummy articles', err);
    return dummyArticles;
  }
}

export default api;