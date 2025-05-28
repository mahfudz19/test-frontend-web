"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";

const SearchArticles = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set("search", value);
      else params.delete("search");

      router.push(`?${params.toString()}`);
    }, 400),
    [searchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <Suspense fallback={<div>Loading pagination...</div>}>
      <input
        type="text"
        // value={search}
        onChange={handleSearchChange}
        placeholder="Search articles..."
        className="border p-2 flex-grow"
      />
    </Suspense>
  );
};

export default SearchArticles;
