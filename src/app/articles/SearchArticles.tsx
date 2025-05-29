"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import IconSearch from "src/components/ui/Icon/IconSearch";
import Input from "src/components/ui/Input";

const SearchArticles = ({
  value,
  handleChangeClient,
  variant,
  fullWidth,
}: {
  value?: string;
  handleChangeClient?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "default" | "bordered" | "underlined";
  fullWidth?: boolean;
}) => {
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
      <Input
        type="text"
        value={value}
        startAdornment={<IconSearch />}
        onChange={(e) =>
          handleChangeClient ? handleChangeClient(e) : handleSearchChange(e)
        }
        variant={variant}
        placeholder="Search articles..."
        fullWidth={fullWidth}
        noFocusAnimation
      />
    </Suspense>
  );
};

export default SearchArticles;
