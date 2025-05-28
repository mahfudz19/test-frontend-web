"use client";
import { useRouter, useSearchParams } from "next/navigation";

function PaginateArticels({
  totalPage,
  curentPage,
}: {
  totalPage: number;
  curentPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value <= 1) params.delete("page");
    else params.set("page", `${value}`);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mt-4 flex justify-center space-x-2">
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handleChange(pageNum)}
          className={`px-3 py-1 border rounded ${
            pageNum === curentPage ? "bg-blue-600 text-white" : ""
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
}

export default PaginateArticels;
