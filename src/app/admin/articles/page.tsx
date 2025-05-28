"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import { Article, ArticleInput } from "@/lib/type";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/api";
import Category from "@/app/articles/CategorySelesct";

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  // Form state
  const [formData, setFormData] = useState<ArticleInput>({
    userId: "",
    categoryId: "",
    title: "",
    content: "",
    imageUrl: "",
  });

  // Debounce search input
  const debounce = (func: (value: string) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (value: string) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, delay);
    };
  };

  const fetchArticles = useCallback(
    async (page: number, category: string, search: string) => {
      setLoading(true);
      try {
        const data = await getArticles({
          page: page.toString(),
          limit: "10",
          category: category || undefined,
          search: search || undefined,
        });
        setArticles(data.data);
        setTotalPages(Math.ceil(data.total / data.limit));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Debounced version of search handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      fetchArticles(1, category, value);
    }, 400),
    [category, fetchArticles]
  );

  useEffect(() => {
    fetchArticles(page, category, search);
  }, [page, category, fetchArticles, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Open modal for create
  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      userId: "",
      categoryId: "",
      title: "",
      content: "",
      imageUrl: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for edit
  const openEditModal = (article: Article) => {
    setModalMode("edit");
    setCurrentArticle(article);
    setFormData({
      userId: article.userId,
      categoryId: article.categoryId,
      title: article.title,
      content: article.content,
      imageUrl: article.imageUrl,
    });
    setIsModalOpen(true);
  };

  // Handle form input change
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === "create") {
        await createArticle(formData);
      } else if (modalMode === "edit" && currentArticle) {
        await updateArticle(currentArticle.id, formData);
      }
      setIsModalOpen(false);
      fetchArticles(page, category, search);
    } catch (error) {
      console.error(error);
      alert("Failed to save article");
    }
  };

  // Handle delete article
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await deleteArticle(id);
      fetchArticles(page, category, search);
    } catch (error) {
      console.error(error);
      alert("Failed to delete article");
    }
  };

  return (
    <Suspense fallback={<div>Loading pagination...</div>}>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Articles</h1>

        <div className="mb-4 flex space-x-4">
          <div className="w-36">
            <Category
              handleChangeClient={(e) => {
                setCategory(e);
                setPage(1);
              }}
            />
          </div>

          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search articles..."
            className="border p-2 flex-grow"
          />

          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create New Article
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <ul>
            {articles.map((article) => (
              <li key={article.id} className="mb-6 border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-sm text-gray-500">
                  By: {article.user.username} | Category:{" "}
                  {article.category.name} | Created:{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
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
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => openEditModal(article)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  pageNum === page ? "bg-blue-600 text-white" : ""
                }`}
              >
                {pageNum}
              </button>
            )
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                {modalMode === "create" ? "Create Article" : "Edit Article"}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="userId">
                    User ID
                  </label>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleFormChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-1 font-semibold"
                    htmlFor="categoryId"
                  >
                    Category ID
                  </label>
                  <input
                    type="text"
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleFormChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="content">
                    Content (HTML)
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    className="border p-2 w-full h-24"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-1 font-semibold"
                    htmlFor="imageUrl"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleFormChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {modalMode === "create" ? "Create" : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </Suspense>
  );
};

export default AdminArticlesPage;
