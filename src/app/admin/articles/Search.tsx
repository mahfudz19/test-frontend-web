import React, { useCallback } from "react";
import SearchArticles from "src/app/articles/SearchArticles";

function Search({
  search,
  category,
  setSearch,
  fetchArticles,
  setPage,
}: {
  search: string;
  category: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchArticles: (
    page: number,
    category: string,
    search: string
  ) => Promise<void>;
}) {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Debounced version of search handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      fetchArticles(1, category, value);
    }, 400),
    [category, fetchArticles]
  );
  return (
    <SearchArticles
      value={search}
      handleChangeClient={handleSearchChange}
      variant="bordered"
    />
  );
}

export default Search;
