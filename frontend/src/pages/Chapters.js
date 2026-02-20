import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function TexasMap({ chapters }) {
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
        {chapters.map((ch, i) => {
          const positions = [
            { x: 200, y: 200 },
            { x: 160, y: 260 },
            { x: 280, y: 220 },
            { x: 180, y: 300 },
            { x: 260, y: 240 },
          ];
          const pos = positions[i % positions.length];
          return (
            <g key={i}>
              <circle cx={pos.x} cy={pos.y} r="8" fill="#0F172A" className="animate-pulse" />
              <circle cx={pos.x} cy={pos.y} r="4" fill="white" />
              <text x={pos.x + 14} y={pos.y + 4} fill="#0F172A" fontSize="10" fontWeight="600" fontFamily="Manrope, sans-serif">
                {ch.university?.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-center text-slate-400 text-sm mt-4">Chapter locations across Texas</p>
    </div>
  );
}

export default function Chapters() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios.get(`${API}/chapters`).then(r => setChapters(r.data)).catch(console.error);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <Badge className="bg-white/10 text-amber-400 border-amber-400/20 mb-4 text-xs">Committee</Badge>
          <h1 data-testid="chapters-page-title" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Expansion
          </h1>
          <p>Growing our impact across Texas universities. Join or start a chapter at your school.</p>
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
              <p className="text-slate-500 mt-3 leading-relaxed">The Expansion Committee drives Texas BHA's growth by establishing new chapters at universities across the state. We provide mentorship, resources, and support to help new chapters thrive from day one.</p>
              <p className="text-xs text-slate-400 mt-4 italic">Upload your team photo via the admin panel</p>
            </div>
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
                Texas BHA chapters are active at major universities across the state. Each chapter operates with autonomy while contributing to our statewide mission of advancing healthcare business education.
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
            <TexasMap chapters={chapters} />
          </div>
        </div>
      </section>

      {/* Chapter Cards */}
      <section data-testid="chapters-grid" className="py-20 bg-slate-50">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-10" style={{ fontFamily: 'Manrope, sans-serif' }}>All Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter, idx) => (
              <Card
                key={chapter.id || idx}
                data-testid={`chapter-card-${idx}`}
                className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {chapter.name}
                      </h3>
                      <p className="text-slate-400 text-sm">{chapter.university}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
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
