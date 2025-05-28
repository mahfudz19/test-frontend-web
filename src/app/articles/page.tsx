import { getArticles } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import Category from "./CategorySelesct";
import PaginateArticels from "./PaginateArticels";
import SearchArticles from "./SearchArticles";

type Props = {
  searchParams: Promise<{ category?: string; page?: string; search: string }>;
};

export default async function UserArticlesPage({ searchParams }: Props) {
  const { category, page, search } = await searchParams;

  const {
    data: articles,
    limit,
    page: curentPage,
    total,
  } = await getArticles({
    category: category,
    search,
    page: page,
    limit: "5",
  });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Articles</h1>
      <div className="flex gap-2 mb-2">
        <div className="w-36">
          <Category />
        </div>
        <SearchArticles />
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id} className="mb-6 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">
              <Link href={`/articles/${article.id}`}>{article.title}</Link>
            </h2>
            <p className="text-sm text-gray-500">
              By: {article.user.username} | Category: {article.category.name} |
              Created: {new Date(article.createdAt).toLocaleDateString()}
            </p>
            {article.imageUrl && (
              <Image
                width={100}
                height={200}
                src={article.imageUrl}
                alt={article.title}
                className="my-2 rounded"
              />
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}

      <PaginateArticels
        totalPage={Math.ceil(total / limit)}
        curentPage={curentPage}
      />
    </main>
  );
}
