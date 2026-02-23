import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Users, BookOpen, Lightbulb, ChevronRight, Megaphone, GraduationCap, Building2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_bha-collective/artifacts/0ijxjfll_image.png";

export default function Home() {
  const [committees, setCommittees] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get(`${API}/committees`).then(r => setCommittees(r.data)).catch(console.error);
    axios.get(`${API}/announcements`).then(r => setAnnouncements(r.data)).catch(console.error);
  }, []);

  return (
    <div>
      {/* News Ticker */}
      {announcements.length > 0 && (
        <div data-testid="news-ticker" className="bg-[#0F172A] text-white py-2 overflow-hidden border-b border-slate-800">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...announcements, ...announcements].map((a, i) => (
              <span key={i} className="inline-flex items-center gap-2 mx-8 text-xs tracking-wide">
                <Megaphone className="h-3 w-3 text-amber-400 shrink-0" />
                <span className="text-slate-300">{a.title}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section data-testid="hero-section" className="bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
        </div>
        <div className="absolute inset-0 bg-[#0F172A]/85" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-amber-400" />
                <span className="text-xs font-medium uppercase tracking-widest text-amber-400">Official Student Org — HEALTHCARE REFORM & INNOVATION Minor, UT Austin</span>
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08]"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Texas Business
                <br />
                Healthcare
                <br />
                <span className="text-slate-400">Association</span>
              </h1>
              <p className="mt-6 text-slate-300 text-[15px] max-w-lg leading-relaxed">
                Preparing the next generation of healthcare business leaders through applied consulting, policy research, and cross-institutional collaboration.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/contact" data-testid="hero-join-btn">
                  <Button className="bg-white text-[#0F172A] hover:bg-slate-100 rounded-full px-7 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                    Join Texas BHA
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/committees/consulting" data-testid="hero-learn-btn">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-7 py-2.5 text-sm">
                    Our Committees
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center animate-fade-in-up-delay-2">
              <div className="relative">
                <div className="w-72 h-72 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-52 h-52 rounded-full bg-[#0F172A] flex items-center justify-center shadow-2xl overflow-hidden">
                    <img src={LOGO_URL} alt="Texas BHA Logo" className="object-contain mix-blend-screen" style={{ width: '420%', height: '420%', marginTop: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1E293B] text-white py-5 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "5+", label: "University Chapters" },
              { num: "6", label: "Active Committees" },
              { num: "500+", label: "Student Members" },
              { num: "20+", label: "Projects Completed" },
            ].map((stat, i) => (
              <div key={i} data-testid={`stat-${i}`}>
                <p className="text-xl lg:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.num}</p>
                <p className="text-slate-400 text-xs mt-0.5 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Affiliation Banner */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-[#BF5700]" />
              <span className="text-sm font-medium text-slate-700">Official Student Organization — HEALTHCARE REFORM & INNOVATION Minor</span>
            </div>
            <Separator orientation="vertical" className="hidden md:block h-5" />
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-slate-400" />
              <span className="text-sm text-slate-500">Student-led organization, faculty-advised</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section data-testid="about-section" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">About Texas BHA</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Where Academic Rigor Meets Industry Impact
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed text-[15px]">
                The Texas Business Healthcare Association is the official student organization of the HEALTHCARE REFORM & INNOVATION minor. Texas BHA is focused on fostering the next generation of healthcare pioneers by exposing students to the financial, managerial, legal, political, and consulting aspects of the healthcare industry through committees, projects, and social programming.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed text-[15px]">
                Through our five committees and expanding chapter network, we prepare students for careers at the intersection of healthcare and business — in consulting, health systems administration, policy, and entrepreneurship.
              </p>
              <Link to="/committees/consulting" data-testid="about-explore-btn">
                <Button className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-6 text-sm font-semibold">
                  Explore Our Work
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team collaboration"
                className="rounded-2xl shadow-md w-full h-72 lg:h-80 object-cover"
              />
              <div className="absolute -bottom-5 -left-5 bg-[#0F172A] text-white rounded-xl p-5 shadow-lg">
                <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Est. 2022</p>
                <p className="text-slate-400 text-xs mt-0.5">Austin, Texas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Banner */}
      <section className="relative h-40 md:h-52 overflow-hidden">
        <img src="https://images.pexels.com/photos/7108403/pexels-photo-7108403.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Healthcare professionals" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/40" />
      </section>

      {/* Committees Section */}
      <section data-testid="committees-section" className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Our Committees</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Driving Impact Across Healthcare
            </h2>
            <p className="mt-2 text-slate-500 max-w-xl mx-auto text-sm">
              Five specialized committees — each focused on a critical dimension of healthcare business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {committees.map((committee, idx) => (
              <Card
                key={committee.id || idx}
                data-testid={`committee-card-${idx}`}
                className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden group"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={committee.photo_url || "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={committee.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {committee.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">{committee.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-400">{committee.leadership?.join(", ")}</span>
                  </div>
                  <Link to="/committees/consulting" data-testid={`committee-learn-more-${idx}`}>
                    <Button variant="ghost" size="sm" className="mt-2 text-[#0F172A] hover:bg-slate-50 p-0 h-auto font-medium text-xs">
                      Learn More <ChevronRight className="ml-0.5 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/committees/consulting" data-testid="view-all-committees">
              <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-7 text-sm font-semibold">
                View All Committees
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Photos */}
      <section className="py-10 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/7108284/pexels-photo-7108284.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/8761541/pexels-photo-8761541.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
            ].map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative group">
                <img src={src} alt={`Team ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-center mt-3 italic">Upload your own team and event photos via the admin panel</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] rounded-2xl p-10 lg:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full border border-white/20" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Ready to Make an Impact?
              </h2>
              <p className="mt-3 text-slate-300 max-w-md mx-auto text-sm">
                Join a growing network of healthcare business leaders at Texas universities.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-7">
                <Link to="/contact" data-testid="cta-join-btn">
                  <Button className="bg-white text-[#0F172A] hover:bg-slate-100 rounded-full px-7 py-2.5 text-sm font-semibold shadow-lg">
                    Get Involved <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/committees/expansion" data-testid="cta-chapters-btn">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-7 py-2.5 text-sm">
                    Start a Chapter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
