import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, User, GraduationCap, School } from "lucide-react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { chapters as chaptersData, teamMembers } from "../data";


// Fix default Leaflet icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icons
const collegeIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#0F172A;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <div style="width:8px;height:8px;border-radius:50%;background:#fff;"></div>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -16],
});

const highSchoolIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="width:22px;height:22px;border-radius:50%;background:#BF5700;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <div style="width:6px;height:6px;border-radius:50%;background:#fff;"></div>
  </div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -14],
});

function TexasMap({ chapters }) {
  const texasCenter = [31.0, -99.0];

  if (!chapters || chapters.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-[500px] flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading map...</p>
      </div>
    );
  }

  return (
    <div data-testid="texas-map" className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <MapContainer
        center={texasCenter}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "480px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        {chapters.map((ch) => {
          if (!ch.lat || !ch.lng) return null;
          const isCollege = ch.chapter_type === "college";
          return (
            <Marker
              key={ch.id}
              position={[ch.lat, ch.lng]}
              icon={isCollege ? collegeIcon : highSchoolIcon}
            >
              <Popup>
                <div className="text-center min-w-[160px]">
                  <p className="font-bold text-sm text-[#0F172A] mb-0.5">{ch.name}</p>
                  <p className="text-xs text-slate-500">{ch.location}</p>
                  <span className={`inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isCollege ? "bg-[#0F172A] text-white" : "bg-[#BF5700] text-white"
                  }`}>
                    {isCollege ? "College" : "High School"}
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="flex justify-center gap-8 py-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#0F172A] flex items-center justify-center border-2 border-white shadow-sm">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="text-xs text-slate-600 font-medium">College Chapters</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#BF5700] flex items-center justify-center border-2 border-white shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="text-xs text-slate-600 font-medium">High School Chapters</span>
        </div>
      </div>
    </div>
  );
}

export default function Chapters() {
  const chapters = chaptersData;
  const expansionChairs = teamMembers.filter(m => m.category === "Expansion Chair");

  const collegeChapters = chapters.filter(c => c.chapter_type === "college");
  const hsChapters = chapters.filter(c => c.chapter_type === "high_school");

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Committee</p>
          <h1 data-testid="chapters-page-title" className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Expansion
          </h1>
          <p className="text-slate-300 mt-4 text-base max-w-2xl">Growing our impact across Texas universities and high schools. Join or start a chapter at your school.</p>
        </div>
      </section>

      {/* Expansion Team Photo */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100">
              <img src="https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Chapter expansion team" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Our Expansion Team</h2>
              <p className="text-slate-500 mt-3 leading-relaxed">The Expansion Committee drives Texas BHA's growth by establishing new chapters at universities and high schools across the state. We provide mentorship, resources, and support to help new chapters thrive from day one.</p>
              <p className="text-xs text-slate-400 mt-4 italic">Upload your team photo via the admin panel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expansion Chairs */}
      <section data-testid="expansion-chairs" className="py-16 lg:py-20 bg-slate-50">
        <div className="container-main">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Leadership</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Expansion Chairs
          </h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 max-w-xl">Meet the leaders driving our chapter growth initiatives.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {expansionChairs.length > 0 ? expansionChairs.map((chair, idx) => (
              <Card key={chair.id || idx} data-testid={`expansion-chair-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
                <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden">
                  {chair.photo_url ? (
                    <img src={chair.photo_url} alt={chair.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-300">
                      <User className="h-16 w-16" />
                      <span className="text-[10px] uppercase tracking-wider text-slate-300">Upload Photo</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {chair.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wide">{chair.role}</p>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-full text-center py-8 bg-white rounded-xl border border-dashed border-slate-200">
                <User className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Expansion chairs will appear here</p>
                <p className="text-slate-400 text-xs mt-1">Add team members with "Expansion Chair" category via admin panel</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Chapters Across Texas
              </h2>
              <p className="text-slate-500 mt-3 leading-relaxed">
                Texas BHA chapters are active at universities and high schools across the state. Each chapter operates with autonomy while contributing to our statewide mission of advancing healthcare business education.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{chapters.length}</p>
                  <p className="text-slate-400 text-sm">Active Chapters</p>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>500+</p>
                  <p className="text-slate-400 text-sm">Total Members</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <TexasMap chapters={chapters} />
            </div>
          </div>
        </div>
      </section>

      {/* College Chapters */}
      <section data-testid="chapters-grid" className="py-20 bg-slate-50">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="h-6 w-6 text-[#0F172A]" />
            <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>College Chapters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegeChapters.map((chapter, idx) => (
              <Card key={chapter.id} data-testid={`college-chapter-${idx}`} className={`bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                chapter.name === "UT Austin" ? "border-2 border-[#BF5700]" : "border border-slate-100"
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      {chapter.name === "UT Austin" && (
                        <Badge className="bg-[#BF5700] text-white text-xs mb-2">Founding Chapter</Badge>
                      )}
                      <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {chapter.name}
                      </h3>
                      <p className="text-slate-400 text-sm">{chapter.university}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      chapter.name === "UT Austin" ? "bg-[#BF5700]" : "bg-[#0F172A]"
                    }`}>
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mt-4 leading-relaxed">{chapter.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{chapter.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* High School Chapters */}
          <div className="flex items-center gap-3 mb-6 mt-12">
            <School className="h-6 w-6 text-[#BF5700]" />
            <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>High School Chapters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hsChapters.map((chapter, idx) => (
              <Card key={chapter.id} data-testid={`hs-chapter-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {chapter.name.replace(' High School', '')}
                      </h3>
                      <p className="text-slate-400 text-sm">{chapter.name}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#BF5700] flex items-center justify-center shrink-0">
                      <School className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mt-4 leading-relaxed">{chapter.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{chapter.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Start a Chapter CTA */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="bg-[#0F172A] rounded-3xl p-12 lg:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-white/20" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Start a Chapter at Your University</h2>
              <p className="text-slate-300 mt-3 max-w-lg mx-auto">
                Bring Texas BHA to your campus. We provide the resources, training, and support to get your chapter started.
              </p>
              <Link to="/contact" data-testid="start-chapter-btn">
                <Button className="mt-8 bg-white text-[#0F172A] hover:bg-slate-100 rounded-full px-8 py-3 text-sm font-semibold shadow-lg">
                  Start a Chapter <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
