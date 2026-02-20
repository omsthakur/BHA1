import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bha-collective/artifacts/1b2ml5jj_tx_bha_logo.jpeg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Consulting", path: "/consulting" },
  { label: "Committees", path: "/committees" },
  { label: "Policy", path: "/policy" },
  { label: "Gallery", path: "/gallery" },
  { label: "Chapters", path: "/chapters" },
  { label: "Opportunities", path: "/opportunities" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="main-navbar"
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="navbar-logo">
            <img src={LOGO_URL} alt="Texas BHA" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-bold text-lg text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Texas BHA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "text-[#0F172A] bg-slate-100 font-semibold"
                    : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/admin" data-testid="admin-link">
              <Button variant="ghost" size="sm" className="text-slate-500 text-xs">
                Admin
              </Button>
            </Link>
            <Link to="/contact" data-testid="navbar-join-btn">
              <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-6 text-sm font-semibold">
                Join Texas BHA
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-btn">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "text-[#0F172A] bg-slate-100 font-semibold"
                        : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 px-4 flex flex-col gap-2">
                  <Link to="/admin" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full text-sm">Admin Panel</Button>
                  </Link>
                  <Link to="/contact" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-[#0F172A] text-white rounded-full text-sm font-semibold">
                      Join Texas BHA
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
