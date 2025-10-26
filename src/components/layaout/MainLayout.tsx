"use client";
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import EyeTest from '../prescription/components/EyeTest';
import { Toaster } from "sonner";

export default function MainLayout() {
  return (
    <div className="w-full">

      {/* Fixed Header + Navbar */}
      {/* <div className=" w-full bg-white dark:bg-surface shadow-md">
        <Header />
        <Navbar />
        <Toaster
          richColors
          closeButton
          position="top-right"
          duration={4000}
          toastOptions={{
            classNames: {
              success: "bg-green-600 text-white",
              error: "bg-red-600 text-white",
              warning: "bg-yellow-500 text-black",
              info: "bg-blue-500 text-white",
            },
          }}
        />
      </div> */}
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
      <main className="main  mt-28">
        <h2 className="text-2xl font-bold text-primary ">
 Eye test Validator And Contact Lens Calculator
        </h2>


          <EyeTest />
      </main>

      <Footer />
    </div>
  );
}
