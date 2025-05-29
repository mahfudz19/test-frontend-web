"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutGrid, Folder } from "lucide-react";
import { twMerge as cn } from "tailwind-merge";
import IconButton from "./ui/IconButton";
import IconMenu from "./ui/Icon/IconMenu";
import IconMenuFoldLeft from "./ui/Icon/IconMenuFoldLeft";

const menu = [
  { href: "/admin/articles", icon: <LayoutGrid />, label: "Articles" },
  { href: "/admin/categories", icon: <Folder />, label: "Categories" },
];

export default function Sidebar({
  closeSidebar,
  open,
}: {
  open: boolean;
  closeSidebar?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="h-full bg-blue-600 text-white w-64 flex flex-col">
      <div className="p-4 font-bold text-lg flex justify-between items-center">
        Admin
        <IconButton
          color="white"
          onClick={closeSidebar}
          className="md:hidden"
          variant="contained"
        >
          {!open ? (
            <IconMenu fontSize={18} />
          ) : (
            <IconMenuFoldLeft fontSize={18} />
          )}
        </IconButton>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded hover:bg-blue-400 transition",
                isActive && "bg-blue-500 font-semibold"
              )}
              onClick={closeSidebar}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => {
            localStorage.clear();
            document.cookie = "token=; Max-Age=0; path=/";
            document.cookie = "role=; Max-Age=0; path=/";
            window.location.href = "/auth/login";
          }}
          className={cn(
            "flex w-full items-center gap-2 px-5 py-2 rounded hover:bg-blue-500 transition"
          )}
        >
          <LogOut />
          Logout
        </button>
      </nav>
    </aside>
  );
}
