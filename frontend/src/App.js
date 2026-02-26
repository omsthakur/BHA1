import "@/App.css";
import { HashRouter, Routes, Route, Outlet } from "react-router-dom";
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
import Newsletter from "@/pages/Newsletter";
import Team from "@/pages/Team";
import Philanthropy from "@/pages/committees/Philanthropy";
import Outreach from "@/pages/committees/Outreach";

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
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/committees/philanthropy" element={<Philanthropy />} />
            <Route path="/committees/consulting" element={<Consulting />} />
            <Route path="/committees/policy" element={<Policy />} />
            <Route path="/committees/expansion" element={<Chapters />} />
            <Route path="/committees/outreach" element={<Outreach />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/team" element={<Team />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </HashRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
