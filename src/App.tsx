"use client";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LensThicknessCalculator from "./pages/LensThicknessCalculator";
import EyeTestPage from "./pages/EyeTest";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<EyeTestPage />} />
        <Route path="/thickness-calculator" element={<LensThicknessCalculator />} />

      </Routes>
    </MainLayout>
  );
}
