"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Category = ({
  handleChangeClient,
}: {
  handleChangeClient?: (value: string) => void;
}) => {
  type ICategory = {
    data: {
      id: string;
      userId: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    }[];
    totalData: number;
    currentPage: number;
    totalPages: number;
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<ICategory["data"]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get<ICategory>(
          `https://test-fe.mysellerpintar.com/api/categories?limit=999`
        );
        setCategories(res.data.data);
      } catch (err) {
        console.error("Gagal fetch artikel", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <></>;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <select
        onChange={(e) =>
          handleChangeClient
            ? handleChangeClient(e.target.value)
            : handleChange(e.target.value)
        }
        className="border p-2 w-full h-full mb-4"
      >
        <option value="">Semua Kategori</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Category;
