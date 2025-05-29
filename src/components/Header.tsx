"use client";

import { usePathname } from "next/navigation";
import IconButton from "./ui/IconButton";
import IconMenu from "./ui/Icon/IconMenu";
import IconMenuFoldLeft from "./ui/Icon/IconMenuFoldLeft";

const pathToTitle = (path: string) => {
  if (path.includes("/admin/articles")) return "Articles";
  if (path.includes("/admin/categories")) return "Categories";
  return "Dashboard";
};

export default function Header({
  open,
  toggleSidebar,
}: {
  open: boolean;
  toggleSidebar: () => void;
}) {
  const pathname = usePathname();
  const title = pathToTitle(pathname);

  return (
    <header className="bg-white shadow px-4 py-5 border-b border-gray-200 flex items-center justify-between md:justify-start">
      <IconButton color="white" onClick={toggleSidebar} className="md:hidden">
        {!open ? (
          <IconMenu fontSize={18} />
        ) : (
          <IconMenuFoldLeft fontSize={18} />
        )}
      </IconButton>
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
    </header>
  );
}
