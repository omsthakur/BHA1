import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, HandHeart, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Philanthropy() {
  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Committee</p>
          <h1 data-testid="philanthropy-page-title" className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Philanthropy</h1>
          <p className="text-slate-300 mt-4 text-base max-w-2xl">Making healthcare accessible through community service, charitable partnerships, and volunteer initiatives.</p>
        </div>
      </section>

      {/* Mission Section with Photo */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-rose-50 text-rose-700 border-rose-200 mb-4 text-xs">Our Mission</Badge>
              <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Giving Back to Our Communities
              </h2>
              <p className="text-slate-500 mt-4 leading-relaxed">
                The Philanthropy Committee leads Texas BHA's charitable initiatives, connecting healthcare business expertise with underserved communities. We organize health fairs, fundraisers, and partnerships with local organizations to make a tangible difference.
              </p>
              <ul className="mt-6 space-y-3">
                {["Community health fairs in underserved neighborhoods", "Fundraising campaigns for healthcare access programs", "Partnerships with local nonprofits and hospitals", "Volunteer coordination for healthcare events", "Donation drives for medical supplies and resources"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img src="https://images.pexels.com/photos/6646875/pexels-photo-6646875.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Philanthropy work" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-slate-400 text-center italic">Photo placeholder — upload your own team photos here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Banner */}
      <section className="relative h-64 overflow-hidden">
        <img src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Community outreach" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/50" />
      </section>

      {/* Initiatives */}
      <section className="py-20 bg-slate-50">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Current Initiatives</h2>
          <p className="text-slate-500 mb-10 max-w-2xl">Join our ongoing efforts to improve healthcare access across Texas.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Annual Health Fair", desc: "Free health screenings, wellness education, and resource distribution for 500+ community members.", color: "bg-rose-50 text-rose-600" },
              { icon: Users, title: "Mentor-A-Patient Program", desc: "Connecting healthcare business students with patients navigating the healthcare system.", color: "bg-blue-50 text-blue-600" },
              { icon: HandHeart, title: "Medical Supply Drive", desc: "Collecting and distributing essential medical supplies to community health centers.", color: "bg-amber-50 text-amber-600" },
            ].map((item, i) => (
              <Card key={i} data-testid={`initiative-card-${i}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <h3 className="text-xl font-bold text-[#0F172A] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Event Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/6646921/pexels-photo-6646921.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/6646875/pexels-photo-6646875.jpeg?auto=compress&cs=tinysrgb&w=400",
            ].map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative group">
                <img src={src} alt={`Philanthropy event ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-center mt-3 italic">Upload your own team and event photos via the admin panel</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Want to Make a Difference?</h2>
          <p className="text-slate-500 mt-2 max-w-lg mx-auto text-sm">Join our philanthropy committee and help us create meaningful change in Texas communities.</p>
          <Link to="/contact" data-testid="philanthropy-cta">
            <Button className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-8 text-sm font-semibold">
              Get Involved <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
