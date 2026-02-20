import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Committees() {
  const [committees, setCommittees] = useState([]);

  useEffect(() => {
    axios.get(`${API}/committees`).then(r => setCommittees(r.data)).catch(console.error);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <Badge className="bg-white/10 text-amber-400 border-amber-400/20 mb-4 text-xs">Our Teams</Badge>
          <h1 data-testid="committees-page-title" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Committees
          </h1>
          <p>The driving force behind Texas BHA's impact. Each committee tackles critical challenges in healthcare business.</p>
        </div>
      </section>

      {/* Committees Grid */}
      <section data-testid="committees-grid" className="py-20 bg-white">
        <div className="container-main">
          <div className="space-y-12">
            {committees.map((committee, idx) => (
              <Card
                key={committee.id || idx}
                data-testid={`committee-detail-${idx}`}
                className="bg-white border border-slate-100 shadow-sm overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className={`h-64 md:h-auto overflow-hidden ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={committee.photo_url || "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600"}
                      alt={committee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                    <Badge className="bg-slate-100 text-[#0F172A] border-slate-200 text-xs w-fit mb-4">
                      Committee {idx + 1}
                    </Badge>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {committee.name}
                    </h2>
                    <p className="text-slate-500 mt-3 leading-relaxed">{committee.description}</p>

                    {committee.mission && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="h-4 w-4 text-[#0F172A]" />
                          <span className="font-semibold text-sm text-[#0F172A]">Mission</span>
                        </div>
                        <p className="text-slate-500 text-sm">{committee.mission}</p>
                      </div>
                    )}

                    {committee.leadership?.length > 0 && (
                      <div className="mt-4 flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-500">
                          <span className="font-medium text-slate-700">Leadership:</span> {committee.leadership.join(", ")}
                        </span>
                      </div>
                    )}

                    <Link to="/contact" data-testid={`committee-join-${idx}`}>
                      <Button className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-6 text-sm font-semibold w-fit">
                        Join This Committee
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Don't See the Right Fit?
          </h2>
          <p className="text-slate-500 mt-2 max-w-lg mx-auto text-sm">
            We're always expanding. Reach out to us about starting a new committee or initiative.
          </p>
          <Link to="/contact" data-testid="committees-contact-btn">
            <Button className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-8 text-sm font-semibold">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
