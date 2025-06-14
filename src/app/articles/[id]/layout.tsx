import type { Metadata } from "next";
import Navbar from "src/components/layout/Navbar";

export const metadata: Metadata = {
  title: "articles",
  description: "Generated by articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
