"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}
