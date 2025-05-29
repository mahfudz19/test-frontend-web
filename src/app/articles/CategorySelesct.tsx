"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CircularProgress from "src/components/ui/CircularProgress";
import Select from "src/components/ui/Select";
import Option from "src/components/ui/Select/Option";

const Category = ({
  handleChangeClient,
  variant,
}: {
  handleChangeClient?: (value: string) => void;
  variant?: "default" | "bordered" | "underlined";
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

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("category", value);
    else params.delete("category");

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      onChange={(e) =>
        handleChangeClient
          ? handleChangeClient(e.target.value)
          : handleChange(e.target.value)
      }
      variant={variant}
      placeholder="Category"
      fullWidth
      noFocusAnimation
      disabled={loading}
      endAdornment={loading ? <CircularProgress color="primary" /> : <></>}
    >
      {categories.map((cat) => (
        <Option key={cat.id} value={cat.id}>
          {cat.id ? cat.name : "Semua Kategori"}
        </Option>
      ))}
    </Select>
  );
};

export default Category;
