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
  // Fixed positions for all chapters
  const chapterPositions = [
    { name: "UT Austin", x: 200, y: 240, type: "college" },
    { name: "Texas A&M", x: 240, y: 220, type: "college" },
    { name: "Prosper HS", x: 220, y: 120, type: "high_school" },
    { name: "Bridgeland HS", x: 280, y: 200, type: "high_school" },
    { name: "Wylie HS", x: 250, y: 140, type: "high_school" },
    { name: "Round Rock HS", x: 195, y: 220, type: "high_school" },
    { name: "Travis HS", x: 205, y: 250, type: "high_school" },
  ];

  return (
    <div className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100">
      <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto" fill="none">
        {/* Simplified Texas outline */}
        <path
          d="M120,40 L280,40 L300,60 L310,80 L320,100 L340,120 L350,150 L360,180 L370,210 L380,260 L360,300 L340,320 L300,340 L260,360 L220,370 L180,360 L140,340 L120,320 L100,300 L80,260 L60,220 L50,180 L60,140 L80,100 L100,60 Z"
          fill="#E2E8F0"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        {/* Chapter dots */}
        {chapterPositions.map((ch, i) => (
          <g key={i}>
            <circle 
              cx={ch.x} 
              cy={ch.y} 
              r={ch.type === "college" ? "10" : "7"} 
              fill={ch.type === "college" ? "#0F172A" : "#BF5700"} 
              className="animate-pulse" 
            />
            <circle cx={ch.x} cy={ch.y} r={ch.type === "college" ? "5" : "3"} fill="white" />
            <text 
              x={ch.x + (ch.type === "college" ? 14 : 10)} 
              y={ch.y + 4} 
              fill="#0F172A" 
              fontSize={ch.type === "college" ? "10" : "8"} 
              fontWeight="600" 
              fontFamily="Manrope, sans-serif"
            >
              {ch.name}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0F172A]" />
          <span className="text-xs text-slate-500">College Chapters</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#BF5700]" />
          <span className="text-xs text-slate-500">High School Chapters</span>
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
        m.role?.toLowerCase().includes('expansion') || 
        m.category === 'Expansion Chairs'
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
                  </div>

                  <p className="text-slate-500 text-sm mt-4 leading-relaxed">{chapter.description}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{chapter.location}</span>
                    </div>
                    {chapter.founding_date && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>Founded {new Date(chapter.founding_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                    )}
                    {chapter.leadership?.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Users className="h-3.5 w-3.5 text-slate-400" />
                        <span>{chapter.leadership.join(", ")}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    data-testid={`chapter-signup-${idx}`}
                    variant="outline"
                    size="sm"
                    className="mt-5 w-full rounded-full text-sm font-medium border-slate-200 hover:bg-slate-50"
                  >
                    Join Chapter <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
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
