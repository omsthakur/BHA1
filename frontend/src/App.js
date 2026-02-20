import "@/App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Consulting from "@/pages/Consulting";
import Committees from "@/pages/Committees";
import Policy from "@/pages/Policy";
import Gallery from "@/pages/Gallery";
import Chapters from "@/pages/Chapters";
import Opportunities from "@/pages/Opportunities";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
