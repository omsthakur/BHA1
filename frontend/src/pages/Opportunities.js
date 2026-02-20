import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Briefcase, Award, Handshake, GraduationCap, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const typeIcons = {
  philanthropy: Heart,
  internship: Briefcase,
  volunteer: Award,
  sponsorship: Handshake,
  professional_development: GraduationCap,
  competition: Trophy,
  general: Briefcase,
};

const typeColors = {
  philanthropy: "bg-rose-50 text-rose-700 border-rose-200",
  internship: "bg-blue-50 text-blue-700 border-blue-200",
  volunteer: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sponsorship: "bg-amber-50 text-amber-700 border-amber-200",
  professional_development: "bg-purple-50 text-purple-700 border-purple-200",
  competition: "bg-orange-50 text-orange-700 border-orange-200",
  general: "bg-slate-50 text-slate-700 border-slate-200",
};

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    axios.get(`${API}/opportunities`).then(r => setOpportunities(r.data)).catch(console.error);
  }, []);

  const philanthropy = opportunities.filter(o => o.type === "philanthropy");
  const other = opportunities.filter(o => o.type !== "philanthropy");

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <Badge className="bg-white/10 text-amber-400 border-amber-400/20 mb-4 text-xs">Get Involved</Badge>
          <h1 data-testid="opportunities-page-title" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Opportunities
          </h1>
          <p>Discover ways to contribute, grow, and make an impact through Texas BHA.</p>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500",
              "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=500",
              "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=500",
            ].map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative group">
                <img src={src} alt={`Opportunity ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-center mt-3 italic">Upload your own team and event photos via the admin panel</p>
        </div>
      </section>

      {/* Philanthropy */}
      {philanthropy.length > 0 && (
        <section data-testid="philanthropy-section" className="py-20 bg-white">
          <div className="container-main">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Philanthropy</h2>
            </div>
            <p className="text-slate-500 mb-10 max-w-2xl">Our charitable work and community partnerships making healthcare accessible to all.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {philanthropy.map((opp, idx) => {
                const Icon = typeIcons[opp.type] || Briefcase;
                return (
                  <Card key={opp.id || idx} data-testid={`philanthropy-card-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-rose-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{opp.title}</h3>
                          <Badge className={`mt-1.5 text-xs ${typeColors[opp.type]}`}>
                            {opp.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{opp.description}</p>
                          <Button data-testid={`philanthropy-cta-${idx}`} className="mt-4 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-6 text-sm font-semibold">
                            {opp.cta_text} <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Other Opportunities */}
      <section data-testid="other-opportunities" className="py-20 bg-slate-50">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>More Opportunities</h2>
          <p className="text-slate-500 mb-10 max-w-2xl">Internships, volunteer roles, competitions, and professional development opportunities.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {other.map((opp, idx) => {
              const Icon = typeIcons[opp.type] || Briefcase;
              return (
                <Card key={opp.id || idx} data-testid={`opportunity-card-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-[#0F172A]" />
                    </div>
                    <Badge className={`text-xs ${typeColors[opp.type]}`}>
                      {opp.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    <h3 className="font-bold text-lg text-[#0F172A] mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{opp.title}</h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">{opp.description}</p>
                    <Button data-testid={`opportunity-cta-${idx}`} className="mt-4 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-6 text-sm font-semibold w-full">
                      {opp.cta_text} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Have a Partnership Idea?</h2>
          <p className="text-slate-500 mt-2 max-w-lg mx-auto text-sm">We're always looking for new ways to create impact. Let's discuss how we can work together.</p>
          <Link to="/contact" data-testid="opportunities-contact-btn">
            <Button className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-8 text-sm font-semibold">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
