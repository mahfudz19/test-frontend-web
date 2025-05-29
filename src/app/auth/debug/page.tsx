"use client";
import { useEffect } from "react";

export default function Debug() {
  useEffect(() => {
    fetch(window.location.href, { redirect: "manual" }).then((res) => {
      console.log("Middleware Headers:");
      res.headers.forEach((v, k) => {
        if (k.startsWith("x-debug")) console.log(k, ":", v);
      });
    });
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Debug Middleware</h1>
      <p>Cek console browser (DevTools) untuk melihat headers</p>
    </main>
  );
}
