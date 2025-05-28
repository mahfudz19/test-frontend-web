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

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";

// const Category = ({
//   category,
//   setCategory,
// }: {
//   category: string;
//   setCategory: (v: string) => void;
// }) => {
//   type ICategory = {
//     data: {
//       id: string;
//       userId: string;
//       name: string;
//       createdAt: string;
//       updatedAt: string;
//     }[];
//     totalData: number;
//     currentPage: number;
//     totalPages: number;
//   };
//   const [categories, setCategories] = useState<ICategory["data"]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get<ICategory>(
//           `https://test-fe.mysellerpintar.com/api/categories?limit=999`
//         );
//         setCategories(res.data.data);
//       } catch (err) {
//         console.error("Gagal fetch artikel", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchArticles();
//   }, []);

//   if (loading) return <></>;

//   return (
//     <>
//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="border p-2 w-full mb-4"
//       >
//         <option value="">Semua Kategori</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>
//     </>
//   );
// };

// const UserArticlesPage: React.FC = () => {
//   const [articles, setArticles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [page, setPage] = useState(1);
//   const [pagination, setPagination] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `https://test-fe.mysellerpintar.com/api/articles?page=${page}&category=${category}`
//         );
//         setPagination(Math.ceil(res.data.total / res.data.limit));
//         setArticles(res.data.data);
//       } catch (err) {
//         console.error("Gagal fetch artikel", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchArticles();
//   }, [category, page]);

//   return (
//     <main className="p-4">
//       <h1 className="text-2xl font-bold mb-4">User Articles</h1>

//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Cari artikel..."
//         className="border p-2 w-full mb-2"
//       />

//       <Category category={category} setCategory={(e) => setCategory(e)} />

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {articles.map((article) => (
//             <li key={article.id} className="mb-6 border p-4 rounded shadow">
//               <h2 className="text-xl font-semibold">{article.title}</h2>
//               <p className="text-sm text-gray-500">
//                 By: {article.user.username} | Category: {article.category.name}{" "}
//                 | Created: {new Date(article.createdAt).toLocaleDateString()}
//               </p>
//               {article.imageUrl && (
//                 <Image
//                   width={100}
//                   height={200}
//                   src={article.imageUrl}
//                   alt={article.title}
//                   className="my-2 rounded"
//                 />
//               )}
//               <div
//                 className="prose max-w-none"
//                 dangerouslySetInnerHTML={{ __html: article.content }}
//               />
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Pagination Controls */}
//       <div className="mt-4 flex justify-center space-x-2">
//         {Array.from({ length: pagination }, (_, i) => i + 1).map((pageNum) => (
//           <button
//             key={pageNum}
//             onClick={() => setPage(pageNum)}
//             className={`px-3 py-1 border rounded ${
//               pageNum === page ? "bg-blue-600 text-white" : ""
//             }`}
//           >
//             {pageNum}
//           </button>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default UserArticlesPage;
