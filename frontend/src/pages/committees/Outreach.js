import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Instagram, Linkedin, Twitter, Globe, PenTool, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Outreach() {
  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <Badge className="bg-white/10 text-amber-400 border-amber-400/20 mb-4 text-xs">Committee</Badge>
          <h1 data-testid="outreach-page-title" style={{ fontFamily: 'Manrope, sans-serif' }}>Outreach & Marketing</h1>
          <p>Amplifying the Texas BHA brand and connecting with healthcare professionals across the state.</p>
        </div>
      </section>

      {/* Mission with Photo */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Marketing team" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-slate-400 text-center italic">Photo placeholder — upload your own team photos here</p>
            </div>
            <div>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200 mb-4 text-xs">Our Mission</Badge>
              <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Building Our Brand & Community
              </h2>
              <p className="text-slate-500 mt-4 leading-relaxed">
                The Outreach & Marketing Committee is responsible for growing the Texas BHA brand, managing our social media presence, and creating compelling content that attracts new members, sponsors, and partners.
              </p>
              <ul className="mt-6 space-y-3">
                {["Social media strategy and content creation", "Event promotion and digital marketing", "Brand guidelines and visual identity", "Newsletter production and distribution", "Partnership outreach and recruitment campaigns"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Banner */}
      <section className="relative h-64 overflow-hidden">
        <img src="https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Creative team" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/50" />
      </section>

      {/* What We Do */}
      <section className="py-20 bg-slate-50">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>What We Do</h2>
          <p className="text-slate-500 mb-10 max-w-2xl">Our team covers every aspect of Texas BHA's public-facing presence.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Megaphone, title: "Event Promotion", desc: "Creating buzz around conferences, networking events, and chapter activities across all channels." },
              { icon: PenTool, title: "Content Creation", desc: "Producing blog posts, infographics, video content, and stories that showcase our impact." },
              { icon: Globe, title: "Website Management", desc: "Keeping our digital presence fresh, engaging, and up-to-date with the latest news." },
              { icon: Instagram, title: "Social Media", desc: "Managing Instagram, LinkedIn, and X/Twitter to engage with our growing community." },
              { icon: BarChart3, title: "Analytics & Growth", desc: "Tracking engagement metrics and optimizing our outreach strategy for maximum impact." },
              { icon: Linkedin, title: "Professional Networking", desc: "Building relationships with industry professionals and potential sponsors through digital outreach." },
            ].map((item, i) => (
              <Card key={i} data-testid={`outreach-card-${i}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-[#0F172A]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 bg-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Follow Texas BHA</h2>
          <p className="text-slate-500 mt-2 text-sm">Stay connected and share our mission.</p>
          <div className="flex justify-center gap-4 mt-6">
            {[
              { icon: Instagram, href: "https://instagram.com/texasbha", label: "Instagram" },
              { icon: Linkedin, href: "https://linkedin.com/company/texasbha", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com/texasbha", label: "X/Twitter" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" data-testid={`outreach-social-${i}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all w-28">
                <s.icon className="h-6 w-6 text-[#0F172A]" />
                <span className="text-xs text-slate-500 font-medium">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 bg-slate-50">
        <div className="container-main">
          <h3 className="text-xl font-bold text-[#0F172A] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Behind the Scenes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=400",
              "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=400",
            ].map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative group">
                <img src={src} alt={`Marketing ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-center mt-3 italic">Upload your own team and event photos via the admin panel</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Join Our Marketing Team</h2>
          <p className="text-slate-500 mt-2 max-w-lg mx-auto text-sm">Are you creative, social-media savvy, or passionate about branding? We want you on our team.</p>
          <Link to="/contact" data-testid="outreach-cta">
            <Button className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-8 text-sm font-semibold">
              Get Involved <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
