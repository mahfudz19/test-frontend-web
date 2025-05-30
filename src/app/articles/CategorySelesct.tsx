"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CircularProgress from "src/components/ui/CircularProgress";
import Select from "src/components/ui/Select";
import Option from "src/components/ui/Select/Option";
import { getCategories } from "src/lib/api";
import { GetCategory } from "src/lib/type";

const Category = ({
  handleChangeClient,
  variant,
}: {
  handleChangeClient?: (value: string) => void;
  variant?: "default" | "bordered" | "underlined";
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<GetCategory["data"]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await getCategories({ limit: "999" });
        setCategories(res.data);
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
