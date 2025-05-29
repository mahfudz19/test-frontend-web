import { getArticleById, getArticles } from "src/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);

  const { data: otherArticles } = await getArticles({
    category: article.category.id,
    limit: "4",
  });

  const filteredOtherArticles = otherArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Artikel utama */}
      <article>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight text-gray-900">
          {article.title}
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          By <strong>{article.user.username}</strong> ·{" "}
          <span>{article.category.name}</span> ·{" "}
          {new Date(article.createdAt).toLocaleDateString()}
        </p>

        {article.imageUrl && (
          <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose lg:prose-lg prose-blue prose-img:rounded-lg prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Artikel lain */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Related Articles
        </h2>

        {filteredOtherArticles.length === 0 ? (
          <p className="text-gray-500">No other articles in this category.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOtherArticles.map((a) => (
              <Link
                key={a.id}
                href={`/articles/${a.id}`}
                className="block p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
              >
                {a.imageUrl && (
                  <div className="relative w-full h-40 rounded mb-3 overflow-hidden">
                    <Image
                      src={a.imageUrl}
                      alt={a.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  By {a.user.username}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
