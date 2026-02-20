import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Instagram, Linkedin, Twitter, Camera } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categories = ["All", "Events", "Meetings", "Socials", "Conferences"];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${API}/gallery`).then(r => setItems(r.data)).catch(console.error);
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
