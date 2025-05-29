"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Category, CategoryInput } from "src/lib/type";
import { getCategories, createCategory, updateCategory } from "src/lib/api";
import Dialog from "src/components/ui/Dialog";
import Paper from "src/components/ui/Paper";
import Typography from "src/components/ui/Typograph";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Pagination from "src/components/ui/Pagination";
import Table from "src/components/ui/Table";
import TableHead from "src/components/ui/Table/TableHead";
import TableRow from "src/components/ui/Table/TableRow";
import TableCell from "src/components/ui/Table/TableCell";
import TableBody from "src/components/ui/Table/TableBody";
import IconButton from "src/components/ui/IconButton";
import IconEdit from "src/components/ui/Icon/IconEdit";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalcategory, setTotalCategory] = useState<number>(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // Form state
  const [formData, setFormData] = useState<CategoryInput>({
    userId: "",
    name: "",
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

  const fetchCategories = useCallback(async (page: number, search: string) => {
    setLoading(true);
    try {
      const data = await getCategories({
        page: page.toString(),
        limit: "10",
        search: search || undefined,
      });
      setCategories(data.data);
      setTotalCategory(data.total);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced version of search handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      fetchCategories(1, value);
    }, 400),
    [fetchCategories]
  );

  useEffect(() => {
    fetchCategories(page, search);
  }, [page, search, fetchCategories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Open modal for create
  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      userId: "",
      name: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for edit
  const openEditModal = (category: Category) => {
    setModalMode("edit");
    setCurrentCategory(category);
    setFormData({
      userId: category.userId,
      name: category.name,
    });
    setIsModalOpen(true);
  };

  // Handle form input change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    if (!formData.userId.trim()) {
      alert("User ID is required");
      return false;
    }
    if (!formData.name.trim()) {
      alert("Category name is required");
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (modalMode === "create") {
        await createCategory(formData);
      } else if (modalMode === "edit" && currentCategory) {
        await updateCategory(currentCategory.id, formData);
      }
      setIsModalOpen(false);
      fetchCategories(page, search);
    } catch (error) {
      console.error(error);
      alert("Failed to save category");
    }
  };

  return (
    <main className="p-4">
      <Paper>
        <Typography
          component="div"
          variant="subtitle1"
          className="p-4 border-b border-gray-300"
        >
          Total Categories: {totalcategory}
        </Typography>

        <div className="p-4 flex gap-4">
          <div className="flex-1 flex gap-4">
            <Input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search categories..."
              variant="bordered"
              noFocusAnimation
            />
          </div>

          <Button onClick={openCreateModal} color="success">
            Create New Category
          </Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
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
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No categories found.</TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow
                  key={category.id}
                  className="border-b border-gray-300"
                >
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <IconButton
                      onClick={() => openEditModal(category)}
                      color="primary"
                      variant="text"
                      sizes="small"
                    >
                      <IconEdit color="primary" fontSize={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {totalPages ? (
          <div className="py-4 flex justify-center space-x-2  border-t border-gray-300">
            <Pagination
              totalCount={totalPages}
              currentPage={page}
              onPageChange={(page: number) => setPage(page)}
            />
          </div>
        ) : (
          <></>
        )}
      </Paper>

      <Dialog
        open={isModalOpen}
        title={modalMode === "create" ? "Create Category" : "Edit Category"}
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
            <Input
              type="text"
              id="userId"
              name="userId"
              variant="bordered"
              value={formData.userId}
              onChange={handleFormChange}
              fullWidth
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="name">
              Category Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              variant="bordered"
              value={formData.name}
              onChange={handleFormChange}
              fullWidth
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="text"
              color="error"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {modalMode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </Dialog>
    </main>
  );
};

export default AdminCategoriesPage;
