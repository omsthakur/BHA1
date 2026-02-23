import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bha-collective/artifacts/0ijxjfll_image.png";

const committeeLinks = [
  { label: "Philanthropy", path: "/committees/philanthropy" },
  { label: "Consulting", path: "/committees/consulting" },
  { label: "Policy", path: "/committees/policy" },
  { label: "Expansion", path: "/committees/expansion" },
  { label: "Outreach/Marketing", path: "/committees/outreach" },
];

const topLinks = [
  { label: "Home", path: "/" },
  { label: "Gallery", path: "/gallery" },
  { label: "Newsletter", path: "/newsletter" },
  { label: "Opportunities", path: "/opportunities" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isCommitteePage = location.pathname.startsWith("/committees");

  return (
    <header
      data-testid="main-navbar"
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="navbar-logo">
            <div className="h-10 w-10 rounded-full bg-[#0F172A] flex items-center justify-center overflow-hidden">
              <img src={LOGO_URL} alt="Texas BHA" className="object-contain mix-blend-screen" style={{ width: '280%', height: '280%', marginTop: '15%' }} />
            </div>
            <span className="font-bold text-lg text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Texas BHA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
            <Link
              to="/"
              data-testid="nav-link-home"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === "/" ? "text-[#0F172A] bg-slate-100 font-semibold" : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            {/* Committees Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                data-testid="nav-committees-dropdown"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors outline-none ${
                  isCommitteePage ? "text-[#0F172A] bg-slate-100 font-semibold" : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-50"
                }`}
              >
                Committees
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                {committeeLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      data-testid={`nav-committee-${link.label.toLowerCase().replace(/\//g, '-')}`}
                      className="cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {topLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path ? "text-[#0F172A] bg-slate-100 font-semibold" : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/admin" data-testid="admin-link">
              <Button variant="ghost" size="sm" className="text-slate-500 text-xs">Admin</Button>
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
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <div className="flex flex-col gap-1 mt-8">
                <Link to="/" onClick={() => setOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg ${location.pathname === "/" ? "text-[#0F172A] bg-slate-100 font-semibold" : "text-slate-600"}`}>
                  Home
                </Link>

                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Committees</p>
                </div>
                {committeeLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\//g, '-')}`}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg ${
                      location.pathname === link.path ? "text-[#0F172A] bg-slate-100 font-semibold" : "text-slate-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="h-px bg-slate-100 my-2" />

                {topLinks.slice(1).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg ${
                      location.pathname === link.path ? "text-[#0F172A] bg-slate-100 font-semibold" : "text-slate-600"
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
