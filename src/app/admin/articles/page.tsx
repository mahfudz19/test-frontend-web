"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import { Article, ArticleInput } from "src/lib/type";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "src/lib/api";
import Category from "src/app/articles/CategorySelesct";
import Paper from "src/components/ui/Paper";
import Typography from "src/components/ui/Typograph";
import SearchArticles from "src/app/articles/SearchArticles";
import Button from "src/components/ui/Button";
import Pagination from "src/components/ui/Pagination";
import Table from "src/components/ui/Table";
import TableHead from "src/components/ui/Table/TableHead";
import TableRow from "src/components/ui/Table/TableRow";
import TableCell from "src/components/ui/Table/TableCell";
import TableBody from "src/components/ui/Table/TableBody";
import IconButton from "src/components/ui/IconButton";
import IconEdit from "src/components/ui/Icon/IconEdit";
import IconDelete from "src/components/ui/Icon/IconDelete";
import Dialog from "src/components/ui/Dialog";

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalArticle, setTotalArticles] = useState<number>(0);
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
        setTotalArticles(data.total);
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
        <Paper>
          <Typography
            component="div"
            variant="subtitle1"
            className="p-4 border-b border-gray-300"
          >
            Total Aricles: {totalArticle}
          </Typography>

          <div className="p-4 flex gap-4">
            <div className="flex-1 flex gap-4">
              <div className="w-36">
                <Category
                  handleChangeClient={(e) => {
                    setCategory(e);
                    setPage(1);
                  }}
                  variant="bordered"
                />
              </div>

              <SearchArticles
                value={search}
                handleChangeClient={handleSearchChange}
                variant="bordered"
              />
            </div>

            <Button onClick={openCreateModal} color="success">
              Create New Article
            </Button>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell head roundedHead="all-none">
                  Thumbnail
                </TableCell>
                <TableCell head roundedHead="all-none">
                  Title
                </TableCell>
                <TableCell head roundedHead="all-none">
                  Category
                </TableCell>
                <TableCell head roundedHead="all-none">
                  Created At
                </TableCell>
                <TableCell head roundedHead="all-none">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              ) : articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No articles found.</TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow
                    key={article.id}
                    className="border-b border-gray-300"
                  >
                    <TableCell>
                      {article.imageUrl && (
                        <Image
                          width={100}
                          height={200}
                          src={article.imageUrl}
                          alt={article.title}
                          className="my-2 rounded"
                        />
                      )}
                    </TableCell>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.category.name}</TableCell>
                    <TableCell>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="mt-2 flex justify-end">
                        <IconButton
                          onClick={() => openEditModal(article)}
                          color="primary"
                          variant="text"
                          sizes="small"
                        >
                          <IconEdit color="primary" fontSize={20} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(article.id)}
                          color="error"
                          variant="text"
                          sizes="small"
                        >
                          <IconDelete color="error" fontSize={20} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="py-4 flex justify-center space-x-2  border-t border-gray-300">
            <Pagination
              totalCount={totalPages}
              currentPage={page}
              onPageChange={(page: number) => setPage(page)}
            />
          </div>
        </Paper>

        {/* Modal */}
        <Dialog
          open={isModalOpen}
          title={modalMode === "create" ? "Create Article" : "Edit Article"}
          onClose={() => setIsModalOpen(false)}
          maxWidth="lg"
          fullWidth
          closeButtom
        >
          <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
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
              <label className="block mb-1 font-semibold" htmlFor="categoryId">
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
              <label className="block mb-1 font-semibold" htmlFor="imageUrl">
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
        </Dialog>
      </main>
    </Suspense>
  );
};

export default AdminArticlesPage;
