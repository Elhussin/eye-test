"use client";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "sonner";
import Nav from "./Nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full bg-white dark:bg-surface shadow-md fixed top-0 left-0 z-50">
        <Header />
        <Nav />
        <Toaster richColors closeButton position="top-right" duration={4000} />
      </div>

      {/* Contant */}
      <main className="main mt-32 p-6">{children}</main>

      <Footer />
    </div>
  );
}
