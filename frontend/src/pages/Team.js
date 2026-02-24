import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(`${API}/team`).then(r => setMembers(r.data)).catch(console.error);
  }, []);

  const execBoard = members.filter(m => m.category === "Executive Board");

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Leadership</p>
          <h1 data-testid="team-page-title" className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Meet Our Team
          </h1>
          <p className="text-slate-300 mt-4 text-base max-w-2xl">
            The dedicated leaders driving Texas BHA's mission forward.
          </p>
        </div>
      </section>

      {/* Executive Board */}
      <section data-testid="executive-board" className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Leadership</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Executive Board
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl mb-8">The executive team responsible for Texas BHA's strategic direction and organizational operations.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {execBoard.map((member, idx) => (
              <Card
                key={member.id || idx}
                data-testid={`team-member-${idx}`}
                className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden">
                  {member.photo_url ? (
                    <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-300">
                      <User className="h-16 w-16" />
                      <span className="text-[10px] uppercase tracking-wider text-slate-300">Upload Photo</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wide">{member.role}</p>
                  {member.bio && (
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-2">{member.bio}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Banner */}
      <section className="relative h-48 overflow-hidden">
        <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Team" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/50" />
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="container-main text-center">
          <h2 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Interested in Joining the Team?</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">
            We're always looking for driven students to take on leadership roles. Reach out to learn about open positions.
          </p>
          <Link to="/contact" data-testid="team-contact-btn">
            <Button className="mt-5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-7 text-sm font-semibold">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
