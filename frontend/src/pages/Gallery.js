import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Instagram, Linkedin, Twitter, Camera, ExternalLink, RefreshCw } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const INSTAGRAM_USERNAME = "texasbha";
const INSTAGRAM_URL = "https://www.instagram.com/texasbha/";

const categories = ["All", "Events", "Meetings", "Socials", "Conferences"];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const instagramRef = useRef(null);

  useEffect(() => {
    axios.get(`${API}/gallery`).then(r => setItems(r.data)).catch(console.error);
  }, []);

  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const filtered = filter === "All" ? items : items.filter(item => item.category === filter);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <Badge className="bg-white/10 text-amber-400 border-amber-400/20 mb-4 text-xs">Gallery</Badge>
          <h1 data-testid="gallery-page-title" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Photos & Media
          </h1>
          <p>Highlights from our events, meetings, and community activities across Texas.</p>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section data-testid="gallery-section" className="py-20 bg-white">
        <div className="container-main">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10" data-testid="gallery-filters">
            {categories.map((cat) => (
              <Button
                key={cat}
                data-testid={`filter-${cat.toLowerCase()}`}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className={`rounded-full text-sm ${
                  filter === cat
                    ? "bg-[#0F172A] text-white hover:bg-[#1E293B]"
                    : "text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item, idx) => (
              <div
                key={item.id || idx}
                data-testid={`gallery-item-${idx}`}
                className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square bg-slate-100"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <Badge className="bg-white/20 text-white text-xs mt-1">{item.category}</Badge>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Camera className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="text-slate-400 mt-4">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden [&>button]:hidden">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
                data-testid="lightbox-image"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-lg font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{selectedImage.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <Badge className="bg-white/20 text-white text-xs">{selectedImage.category}</Badge>
                  {selectedImage.date && <span className="text-white/60 text-xs">{selectedImage.date}</span>}
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors cursor-pointer"
                data-testid="lightbox-close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Instagram Feed Section */}
      <section data-testid="instagram-feed" className="py-20 bg-white border-t border-slate-100">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Instagram className="h-6 w-6 text-pink-500" />
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Live Feed</p>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Follow @{INSTAGRAM_USERNAME}
              </h2>
              <p className="text-slate-500 text-sm mt-2">See our latest posts and updates from Instagram.</p>
            </div>
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Instagram className="h-4 w-4" />
              Follow Us
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          
          {/* Instagram Embeds Grid */}
          <div ref={instagramRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Instagram Profile Embed */}
            <div className="col-span-full lg:col-span-1">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink={INSTAGRAM_URL}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '12px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: 0,
                  width: '100%'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#0F172A] no-underline"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center">
                      <Instagram className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold">@{INSTAGRAM_USERNAME}</span>
                  </a>
                </div>
              </blockquote>
            </div>

            {/* Feed Preview Cards */}
            <div className="col-span-full lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Texas BHA</h3>
                    <p className="text-slate-500 text-sm">@{INSTAGRAM_USERNAME}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-6">
                  Stay connected with Texas Business Healthcare Association! Follow us for event updates, project highlights, member spotlights, and healthcare industry insights.
                </p>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center group cursor-pointer hover:from-pink-100 hover:to-purple-100 transition-all">
                      <Instagram className="h-6 w-6 text-slate-300 group-hover:text-pink-400 transition-colors" />
                    </div>
                  ))}
                </div>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#0F172A] text-white rounded-xl font-semibold text-sm hover:bg-[#1E293B] transition-colors"
                >
                  View Instagram Profile
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Follow Button */}
          <div className="mt-6 md:hidden">
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full text-sm font-semibold"
            >
              <Instagram className="h-4 w-4" />
              Follow @{INSTAGRAM_USERNAME}
            </a>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 bg-slate-50">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Follow Us on Social Media</h2>
          <p className="text-slate-500 mt-2 text-sm">Stay updated with our latest events and activities.</p>
          <div className="flex justify-center gap-4 mt-6">
            <a href="https://instagram.com/texasbha" target="_blank" rel="noopener noreferrer" data-testid="social-instagram"
              className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all">
              <Instagram className="h-6 w-6 text-[#0F172A]" />
            </a>
            <a href="https://linkedin.com/company/texasbha" target="_blank" rel="noopener noreferrer" data-testid="social-linkedin"
              className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all">
              <Linkedin className="h-6 w-6 text-[#0F172A]" />
            </a>
            <a href="https://twitter.com/texasbha" target="_blank" rel="noopener noreferrer" data-testid="social-twitter"
              className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all">
              <Twitter className="h-6 w-6 text-[#0F172A]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
