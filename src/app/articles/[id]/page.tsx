import { getArticleById, getArticles } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);

  const { data: otherArticles } = await getArticles({
    category: article.category.id,
    limit: "4",
  });

  const filteredOtherArticles = otherArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        By: {article.user.username} | Category: {article.category.name} |
        Created: {new Date(article.createdAt).toLocaleDateString()}
      </p>
      {article.imageUrl && (
        <Image
          width={400}
          height={300}
          src={article.imageUrl}
          alt={article.title}
          className="my-4 rounded"
        />
      )}
      <article
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Other Articles</h2>
        {filteredOtherArticles.length === 0 ? (
          <p>No other articles in this category.</p>
        ) : (
          <ul>
            {filteredOtherArticles.map((a) => (
              <li key={a.id} className="mb-4 border p-4 rounded shadow">
                <Link
                  href={`/articles/${a.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {a.title}
                </Link>
                <p className="text-sm text-gray-500">
                  By: {a.user.username} | Created:{" "}
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
