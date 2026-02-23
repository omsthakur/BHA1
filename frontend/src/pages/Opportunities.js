import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Briefcase, Award, Handshake, GraduationCap, Trophy, ArrowRight, ExternalLink, CheckCircle2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const typeIcons = {
  philanthropy: Heart, internship: Briefcase, volunteer: Award,
  sponsorship: Handshake, professional_development: GraduationCap,
  competition: Trophy, general: Briefcase,
};

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    axios.get(`${API}/opportunities`).then(r => setOpportunities(r.data)).catch(console.error);
  }, []);

  const internships = opportunities.filter(o => o.type === "internship" || o.type === "competition" || o.type === "professional_development");
  const philanthropy = opportunities.filter(o => o.type === "philanthropy" || o.type === "volunteer");
  const other = opportunities.filter(o => o.type === "sponsorship" || o.type === "general");

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Get Involved</p>
          <h1 data-testid="opportunities-page-title" className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Opportunities
          </h1>
          <p className="text-slate-300 mt-4 text-base max-w-2xl">Discover ways to grow your career, contribute to healthcare innovation, and make an impact through Texas BHA.</p>
        </div>
      </section>

      {/* HEALTHCARE REFORM & INNOVATION Minor — TOP */}
      <section data-testid="minor-section" className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-5 w-5 text-[#BF5700]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Academic Program</p>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                HEALTHCARE REFORM & INNOVATION Minor
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed text-[15px]">
                The HEALTHCARE REFORM & INNOVATION minor at the University of Texas at Austin equips students with a multidisciplinary understanding of the healthcare industry. The program covers the financial, managerial, legal, and political dimensions of healthcare, preparing graduates for leadership roles across the sector.
              </p>
              <p className="text-slate-600 mt-3 leading-relaxed text-[15px]">
                As the official student organization of this minor, Texas BHA provides a hands-on complement to the academic curriculum — offering real consulting projects, policy research, and professional development opportunities.
              </p>

              <div className="mt-6 space-y-2">
                <h3 className="font-semibold text-sm text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Why Pursue the Minor?</h3>
                {["Gain cross-functional understanding of healthcare systems", "Develop consulting, policy, and leadership skills", "Access exclusive internship and career pathways", "Join a network of healthcare-focused professionals", "Complement any major with healthcare industry expertise"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0F172A] mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="https://www.utexas.edu"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="ut-minor-link"
              >
                <Button className="mt-6 bg-[#BF5700] hover:bg-[#A64B00] text-white rounded-full px-6 text-sm font-semibold">
                  Learn More at UT Austin <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img src="https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=600" alt="UT Austin campus" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-slate-400 text-center italic">Upload your own campus or program photos via the admin panel</p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-slate-100" />

      {/* Internships & Professional Development — MIDDLE */}
      <section data-testid="internships-section" className="py-16 lg:py-20 bg-slate-50">
        <div className="container-main">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-5 w-5 text-[#0F172A]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Career Development</p>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Internships & Professional Development
          </h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 max-w-2xl">Hands-on opportunities to build your career in healthcare business.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {internships.map((opp, idx) => {
              const Icon = typeIcons[opp.type] || Briefcase;
              return (
                <Card key={opp.id || idx} data-testid={`internship-card-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-[#0F172A]" />
                    </div>
                    <Badge className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {opp.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    <h3 className="font-semibold text-[15px] text-[#0F172A] mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{opp.title}</h3>
                    <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">{opp.description}</p>
                    <Button data-testid={`internship-cta-${idx}`} className="mt-4 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-5 text-sm font-semibold w-full">
                      {opp.cta_text} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Separator className="bg-slate-100" />

      {/* Philanthropy & Volunteering — BOTTOM */}
      <section data-testid="philanthropy-opportunities" className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-rose-500" />
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Give Back</p>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Philanthropy & Volunteering
              </h2>
              <p className="text-slate-500 text-sm mt-2 mb-6 max-w-lg">Make a tangible difference in Texas communities through our charitable initiatives and volunteer programs.</p>

              <div className="space-y-4">
                {philanthropy.map((opp, idx) => {
                  const Icon = typeIcons[opp.type] || Heart;
                  return (
                    <Card key={opp.id || idx} data-testid={`philanthropy-card-${idx}`} className="bg-white border border-slate-100 shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5 text-rose-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{opp.title}</h3>
                            <p className="text-slate-500 text-sm mt-1 leading-relaxed">{opp.description}</p>
                            <Button data-testid={`philanthropy-cta-${idx}`} size="sm" className="mt-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-5 text-xs font-semibold">
                              {opp.cta_text} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Volunteer event" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-slate-400 text-center italic">Upload your own event photos via the admin panel</p>

              {/* Other Opportunities */}
              {other.length > 0 && (
                <div className="mt-4 space-y-3">
                  {other.map((opp, idx) => {
                    const Icon = typeIcons[opp.type] || Briefcase;
                    return (
                      <Card key={opp.id || idx} data-testid={`other-opp-${idx}`} className="bg-slate-50 border border-slate-100">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-slate-400 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-[#0F172A]">{opp.title}</h4>
                              <p className="text-slate-500 text-xs mt-0.5 truncate">{opp.description}</p>
                            </div>
                            <Button size="sm" variant="outline" className="rounded-full text-xs shrink-0">
                              {opp.cta_text}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="container-main text-center">
          <h2 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Have a Partnership Idea?</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">We're always looking for new ways to create impact. Let's discuss how we can work together.</p>
          <Link to="/contact" data-testid="opportunities-contact-btn">
            <Button className="mt-5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-7 text-sm font-semibold">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
