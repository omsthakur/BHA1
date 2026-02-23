import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, BookOpen, Lightbulb, ChevronRight, Megaphone } from "lucide-react";

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
        <div data-testid="news-ticker" className="bg-[#0F172A] text-white py-2.5 overflow-hidden border-b border-slate-800">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...announcements, ...announcements].map((a, i) => (
              <span key={i} className="inline-flex items-center gap-2 mx-8 text-sm">
                <Megaphone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-200">{a.title}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section data-testid="hero-section" className="bg-[#0F172A] text-white relative overflow-hidden">
        {/* Blurred Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
            className="w-full h-full object-cover opacity-15 blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-[#0F172A]/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="bg-white/10 text-amber-400 border-amber-400/20 mb-6 text-xs font-medium px-3 py-1">
                Shaping the Future of Healthcare Business
              </Badge>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Texas Business
                <br />
                <span className="text-slate-400">Healthcare</span>
                <br />
                Association
              </h1>
              <p className="mt-6 text-slate-300 text-base lg:text-lg max-w-lg leading-relaxed">
                Empowering student leaders and young professionals to transform the healthcare industry through consulting, policy research, and community engagement.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact" data-testid="hero-join-btn">
                  <Button className="bg-white text-[#0F172A] hover:bg-slate-100 rounded-full px-8 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                    Join Texas BHA
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/committees/consulting" data-testid="hero-learn-btn">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3 text-sm font-medium">
                    Explore Committees
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center animate-fade-in-up-delay-2">
              <div className="relative">
                <div className="w-72 h-72 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-52 h-52 rounded-full bg-[#0F172A] flex items-center justify-center shadow-2xl overflow-hidden">
                    <img src={LOGO_URL} alt="Texas BHA Logo" className="w-[220%] h-[220%] object-contain mix-blend-screen" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-amber-500/20 backdrop-blur-sm flex items-center justify-center">
                  <Users className="h-8 w-8 text-amber-400" />
                </div>
                <div className="absolute -bottom-2 -left-6 w-20 h-20 rounded-2xl bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
                <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-xl bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1E293B] text-white py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "5+", label: "University Chapters" },
              { num: "6", label: "Active Committees" },
              { num: "500+", label: "Student Members" },
              { num: "20+", label: "Projects Completed" },
            ].map((stat, i) => (
              <div key={i} data-testid={`stat-${i}`}>
                <p className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.num}</p>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section data-testid="about-section" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-slate-100 text-[#0F172A] border-slate-200 mb-4 text-xs font-medium">About Us</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Bridging Business & Healthcare
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Texas BHA is a student-led organization dedicated to preparing the next generation of healthcare business leaders. We combine rigorous academic research with real-world consulting to create meaningful impact across the Texas healthcare landscape.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Through our committees, chapters, and partnerships, we provide students with hands-on experience in healthcare consulting, policy analysis, and community health initiatives.
              </p>
              <Link to="/committees" data-testid="about-explore-btn">
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
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0F172A] text-white rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Est. 2022</p>
                <p className="text-slate-400 text-sm">Austin, Texas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Banner */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img src="https://images.pexels.com/photos/7108403/pexels-photo-7108403.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Healthcare professionals" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/40" />
      </section>

      {/* Committees Section */}
      <section data-testid="committees-section" className="py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-slate-100 text-[#0F172A] border-slate-200 mb-4 text-xs font-medium">Our Committees</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Driving Impact Across Healthcare
            </h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
              Our six specialized committees are the engine of Texas BHA, each focused on a critical area of healthcare business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee, idx) => (
              <Card
                key={committee.id || idx}
                data-testid={`committee-card-${idx}`}
                className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={committee.photo_url || "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={committee.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {committee.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">{committee.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-400">{committee.leadership?.join(", ")}</span>
                  </div>
                  <Link to="/committees/consulting" data-testid={`committee-learn-more-${idx}`}>
                    <Button variant="ghost" size="sm" className="mt-3 text-[#0F172A] hover:text-[#0F172A] hover:bg-slate-50 p-0 h-auto font-medium text-sm">
                      Learn More <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/committees/consulting" data-testid="view-all-committees">
              <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-8 text-sm font-semibold">
                View All Committees
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Photos Section */}
      <section className="py-12 bg-white">
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
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-white/20" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-white/10" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Ready to Make an Impact?
              </h2>
              <p className="mt-4 text-slate-300 max-w-xl mx-auto">
                Join Texas BHA and become part of a growing community of healthcare business leaders across Texas universities.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link to="/contact" data-testid="cta-join-btn">
                  <Button className="bg-white text-[#0F172A] hover:bg-slate-100 rounded-full px-8 py-3 text-sm font-semibold shadow-lg">
                    Get Involved
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/committees/expansion" data-testid="cta-chapters-btn">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3 text-sm">
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
