import React from 'react';
import { dummyArticles } from '../../../lib/dummy-articles';


const UserArticlesPage: React.FC = () => {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Articles</h1>
      <ul>
        {dummyArticles.map((article) => (
          <li key={article.id} className="mb-6 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-500">
              By: {article.user.username} | Category: {article.category.name} | Created: {new Date(article.createdAt).toLocaleDateString()}
            </p>
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.title} className="my-2 max-w-full h-auto rounded" />
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default UserArticlesPage;