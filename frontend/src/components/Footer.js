import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bha-collective/artifacts/o98mp0qz_image.png";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Philanthropy", path: "/committees/philanthropy" },
  { label: "Consulting", path: "/committees/consulting" },
  { label: "Policy", path: "/committees/policy" },
];

const moreLinks = [
  { label: "Expansion", path: "/committees/expansion" },
  { label: "Outreach", path: "/committees/outreach" },
  { label: "Gallery", path: "/gallery" },
  { label: "Newsletter", path: "/newsletter" },
  { label: "Opportunities", path: "/opportunities" },
  { label: "Contact Us", path: "/contact" },
];

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-white/10 p-1 flex items-center justify-center overflow-hidden">
                <img src={LOGO_URL} alt="Texas BHA" className="h-full w-full object-contain mix-blend-screen" />
              </div>
              <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Texas BHA
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering the next generation of healthcare business leaders across Texas through consulting, research, and community.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://linkedin.com/company/texasbha" target="_blank" rel="noopener noreferrer" data-testid="footer-linkedin" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/texasbha" target="_blank" rel="noopener noreferrer" data-testid="footer-twitter" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/texasbha" target="_blank" rel="noopener noreferrer" data-testid="footer-instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              More
            </h4>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@texasbha.org" className="hover:text-white transition-colors">info@texasbha.org</a>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(512) 555-0199</span>
              </li>
              <li className="text-slate-400 text-sm mt-2">
                Based in Texas
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} Texas Business Healthcare Association. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-slate-500 text-xs hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-slate-500 text-xs hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
