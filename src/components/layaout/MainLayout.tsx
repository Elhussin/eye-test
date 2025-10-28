"use client";
import Header from './Header';
import Footer from './Footer';
import EyeTest from '../prescription/EyeTest';
import { Toaster } from "sonner";

export default function MainLayout() {
  return (
    <div className="w-full">
      <div className="w-full bg-white dark:bg-surface shadow-md fixed top-0 left-0 z-50">
        <Header />
        {/* <Navbar /> */}
        <Toaster
          richColors
          closeButton
          position="top-right"
          duration={4000}
        />
      </div>

      {/* Content */}
      <main className="main mt-28">
        <EyeTest />
      </main>
      <Footer />
    </div>
  );
}
