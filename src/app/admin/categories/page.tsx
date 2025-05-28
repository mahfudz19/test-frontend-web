"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Category, CategoryInput } from "@/lib/type";
import { getCategories, createCategory, updateCategory } from "@/lib/api";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

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
      <h1 className="text-2xl font-bold mb-4">Admin Categories</h1>

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search categories..."
          className="border p-2 flex-grow"
        />

        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create New Category
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className="mb-4 border p-4 rounded shadow flex justify-between items-center"
            >
              <span>{category.name}</span>
              <button
                onClick={() => openEditModal(category)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-3 py-1 border rounded ${
              pageNum === page ? "bg-blue-600 text-white" : ""
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === "create" ? "Create Category" : "Edit Category"}
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
                <label className="block mb-1 font-semibold" htmlFor="name">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="border p-2 w-full"
                  required
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
  );
};

export default AdminCategoriesPage;
