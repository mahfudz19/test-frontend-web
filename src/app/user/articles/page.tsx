import Category from "@/components/user/articels/CategorySelesct";
import PaginateArticels from "@/components/user/articels/PaginateArticels";
import { getArticles } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: { category?: string; page?: string };
};

const UserArticlesPage = async ({ searchParams }: Props) => {
  const {
    data: articles,
    limit,
    page,
    total,
  } = await getArticles({
    category: searchParams.category,
    page: searchParams.page,
    limit: "5",
  });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Articles</h1>

      <Category />

      <ul>
        {articles.map((article) => (
          <li key={article.id} className="mb-6 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">
              <Link href={`/user/articles/${article.id}`}>{article.title}</Link>
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
        curentPage={page}
      />
    </main>
  );
};

export default UserArticlesPage;
