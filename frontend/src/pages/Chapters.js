import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, ExternalLink, ArrowRight, User, GraduationCap, School } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Static chapter data for high schools and colleges
const staticChapters = {
  highSchools: [
    { name: "Prosper High School", location: "Prosper, TX", type: "high_school" },
    { name: "Bridgeland High School", location: "Cypress, TX", type: "high_school" },
    { name: "Wylie High School", location: "Wylie, TX", type: "high_school" },
    { name: "Round Rock High School", location: "Round Rock, TX", type: "high_school" },
    { name: "Travis High School", location: "Austin, TX", type: "high_school" },
  ],
  colleges: [
    { name: "Texas A&M University", location: "College Station, TX", type: "college" },
  ]
};

function TexasMap() {
  // Chapter positions adjusted to fit within the Texas shape
  const chapterPositions = [
    // Colleges
    { name: "UT Austin", x: 180, y: 280, type: "college" },
    { name: "Texas A&M", x: 220, y: 265, type: "college" },
    // High Schools - Dallas/North Texas area
    { name: "Prosper HS", x: 200, y: 130, type: "high_school" },
    { name: "Wylie HS", x: 230, y: 145, type: "high_school" },
    // Houston area
    { name: "Bridgeland HS", x: 260, y: 290, type: "high_school" },
    // Austin area
    { name: "Round Rock HS", x: 170, y: 260, type: "high_school" },
    { name: "Travis HS", x: 175, y: 295, type: "high_school" },
  ];

  return (
    <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="absolute top-4 left-4 z-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Established 2019</p>
      </div>
      <svg viewBox="0 0 400 400" className="w-full max-w-lg mx-auto" fill="none">
        {/* Texas state outline */}
        <path
          d="M100,50 L120,50 L140,45 L160,42 L180,40 L200,38 L220,38 L240,40 L260,42 L280,48 L300,55 
             L315,70 L325,90 L335,110 L340,130 L345,160 L350,190 L355,220 L358,250 L355,280 
             L350,310 L340,335 L325,355 L305,370 L280,380 L250,385 L220,382 L190,378 L160,370 
             L135,358 L115,340 L100,318 L90,290 L82,260 L78,230 L76,200 L78,170 L84,140 
             L92,110 L100,80 Z"
          fill="#F1F5F9"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        
        {/* Chapter markers */}
        {chapterPositions.map((ch, i) => (
          <g key={i}>
            {/* Outer glow */}
            <circle 
              cx={ch.x} 
              cy={ch.y} 
              r={ch.type === "college" ? "18" : "14"} 
              fill={ch.type === "college" ? (ch.name === "UT Austin" ? "#BF5700" : "#0F172A") : "#BF5700"}
              opacity="0.2"
            />
            {/* Main marker */}
            <circle 
              cx={ch.x} 
              cy={ch.y} 
              r={ch.type === "college" ? "10" : "7"} 
              fill={ch.type === "college" ? (ch.name === "UT Austin" ? "#BF5700" : "#0F172A") : "#BF5700"} 
              stroke="white"
              strokeWidth="2"
            />
            {/* Inner dot */}
            <circle 
              cx={ch.x} 
              cy={ch.y} 
              r={ch.type === "college" ? "3" : "2"} 
              fill="white" 
            />
            {/* Label */}
            <text 
              x={ch.x + (ch.type === "college" ? 14 : 10)} 
              y={ch.y + 4} 
              fill="#0F172A" 
              fontSize={ch.type === "college" ? "10" : "9"} 
              fontWeight="600"
              fontFamily="sans-serif"
            >
              {ch.name}
            </text>
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-slate-100">
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
  const [chapters, setChapters] = useState([]);
  const [expansionChairs, setExpansionChairs] = useState([]);

  useEffect(() => {
    axios.get(`${API}/chapters`).then(r => setChapters(r.data)).catch(console.error);
    axios.get(`${API}/team`).then(r => {
      const chairs = r.data.filter(m => 
        m.category === 'Expansion Chair'
      );
      setExpansionChairs(chairs);
    }).catch(console.error);
  }, []);

  const totalChapters = staticChapters.highSchools.length + staticChapters.colleges.length + 1; // +1 for UT Austin

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Committee</p>
            <span className="text-slate-500">•</span>
            <p className="text-amber-400 text-xs font-medium uppercase tracking-widest">Est. 2019</p>
          </div>
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
                <p className="text-slate-400 text-xs mt-1">Add team members with "Expansion" in their role via admin panel</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Chapters Across Texas
              </h2>
              <p className="text-slate-500 mt-3 leading-relaxed">
                Texas BHA chapters are active at universities and high schools across the state. Each chapter operates with autonomy while contributing to our statewide mission of advancing healthcare business education.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{totalChapters}</p>
                  <p className="text-slate-400 text-sm">Active Chapters</p>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>500+</p>
                  <p className="text-slate-400 text-sm">Total Members</p>
                </div>
              </div>
            </div>
            <TexasMap />
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
            {/* UT Austin - Main Chapter */}
            <Card className="bg-white border-2 border-[#BF5700] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-[#BF5700] text-white text-xs mb-2">Founding Chapter</Badge>
                    <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      UT Austin
                    </h3>
                    <p className="text-slate-400 text-sm">University of Texas at Austin</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#BF5700] flex items-center justify-center shrink-0">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-slate-500 text-sm mt-4 leading-relaxed">The founding chapter of Texas BHA, home to the HEALTHCARE REFORM & INNOVATION minor.</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>Austin, TX</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Texas A&M */}
            {staticChapters.colleges.map((chapter, idx) => (
              <Card key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {chapter.name.replace(' University', '')}
                      </h3>
                      <p className="text-slate-400 text-sm">{chapter.name}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mt-4 leading-relaxed">Expanding the Texas BHA mission to Aggieland.</p>
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
            {staticChapters.highSchools.map((chapter, idx) => (
              <Card key={idx} data-testid={`hs-chapter-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
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
                  <p className="text-slate-500 text-sm mt-4 leading-relaxed">Introducing healthcare business to the next generation.</p>
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
