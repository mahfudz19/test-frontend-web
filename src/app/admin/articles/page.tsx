"use client";

import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";
import Category from "src/app/articles/CategorySelesct";
import Button from "src/components/ui/Button";
import Dialog from "src/components/ui/Dialog";
import IconDelete from "src/components/ui/Icon/IconDelete";
import IconEdit from "src/components/ui/Icon/IconEdit";
import IconButton from "src/components/ui/IconButton";
import Pagination from "src/components/ui/Pagination";
import Paper from "src/components/ui/Paper";
import Table from "src/components/ui/Table";
import TableBody from "src/components/ui/Table/TableBody";
import TableCell from "src/components/ui/Table/TableCell";
import TableHead from "src/components/ui/Table/TableHead";
import TableRow from "src/components/ui/Table/TableRow";
import Typography from "src/components/ui/Typograph";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "src/lib/api";
import { Article, ArticleInput } from "src/lib/type";
import ArticleForm from "./ArticleForm";
import Search from "./Search";

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

  useEffect(() => {
    fetchArticles(page, category, search);
  }, [page, category, fetchArticles, search]);

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

              <Search
                search={search}
                category={category}
                setSearch={setSearch}
                fetchArticles={fetchArticles}
                setPage={setPage}
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
                          onClick={async () => {
                            if (
                              !confirm(
                                "Are you sure you want to delete this article?"
                              )
                            )
                              return;
                            try {
                              await deleteArticle(article.id);
                              fetchArticles(page, category, search);
                            } catch (error) {
                              console.error(error);
                              alert("Failed to delete article");
                            }
                          }}
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
          <ArticleForm
            defaultValues={formData}
            modalMode={modalMode}
            onClose={() => setIsModalOpen(false)}
            onSubmitForm={async (formData) => {
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
            }}
          />
        </Dialog>
      </main>
    </Suspense>
  );
};

export default AdminArticlesPage;
