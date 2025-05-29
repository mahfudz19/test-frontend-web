"use client";
import { useState } from "react";
import Header from "src/components/layout/Header";
import Sidebar from "src/components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop and mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-40 md:static md:translate-x-0 transform transition-transform duration-300 ease-in-out bg-blue-400 text-white w-64 h-full flex-shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar
          open={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          open={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
