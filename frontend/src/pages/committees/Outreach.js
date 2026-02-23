import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Megaphone, Instagram, Linkedin, Twitter, Globe, PenTool, BarChart3, ArrowRight, CheckCircle2, Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const upcomingEvents = [
  { title: "Spring Healthcare Business Conference", date: "March 28, 2025", time: "9:00 AM - 5:00 PM", location: "UT Austin, McCombs School of Business", desc: "Keynote speakers from major Texas health systems, panel discussions, and networking." },
  { title: "Health Policy Research Symposium", date: "April 12, 2025", time: "2:00 PM - 6:00 PM", location: "UT Austin, Norman Hackerman Building", desc: "Student research presentations on healthcare policy issues affecting Texas communities." },
  { title: "Healthcare Consulting Case Competition", date: "April 25-26, 2025", time: "All Day", location: "Virtual + In-Person Finals", desc: "Teams compete to solve real healthcare business challenges. $10,000 in prizes." },
  { title: "End-of-Year Networking Gala", date: "May 3, 2025", time: "6:00 PM - 9:00 PM", location: "AT&T Conference Center, Austin", desc: "Celebrating the year's achievements with industry professionals and faculty." },
];

export default function Outreach() {
  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Committee</p>
          <h1 data-testid="outreach-page-title" className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Outreach & Marketing</h1>
          <p className="text-slate-300 mt-4 text-base max-w-2xl">Amplifying the Texas BHA brand and connecting with healthcare professionals, faculty, and industry leaders across the state.</p>
        </div>
      </section>

      {/* Mission with Photo */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Marketing team" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-slate-400 text-center italic">Upload your own team photos via the admin panel</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Our Mission</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Building Our Brand & Community
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed text-[15px]">
                The Outreach & Marketing Committee is responsible for growing the Texas BHA brand, managing our social media presence, and creating compelling content that attracts new members, sponsors, and partners. As the public face of an organization affiliated with UT Austin's Healthcare Administration minor, we uphold a standard of professionalism and institutional credibility in all communications.
              </p>
              <ul className="mt-5 space-y-2.5">
                {["Social media strategy and content creation", "Event promotion and digital marketing campaigns", "Brand identity and visual standards", "Newsletter production and distribution", "Partnership outreach and sponsor recruitment"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-[#0F172A] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section data-testid="upcoming-events" className="py-16 lg:py-20 bg-slate-50">
        <div className="container-main">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">What's Next</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Upcoming Events</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {upcomingEvents.map((event, i) => (
              <Card key={i} data-testid={`event-card-${i}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#0F172A] flex flex-col items-center justify-center shrink-0 text-white">
                      <span className="text-[10px] font-medium uppercase leading-none">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold leading-tight">{event.date.split(' ')[1]?.replace(',', '')}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#0F172A] text-[15px] leading-snug" style={{ fontFamily: 'Manrope, sans-serif' }}>{event.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />{event.time}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <MapPin className="h-3 w-3" />{event.location}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm mt-2 leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Google Calendar Embed */}
      <section data-testid="google-calendar" className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-[#0F172A]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Live Calendar</p>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>BHA Event Calendar</h2>
          <p className="text-slate-500 text-sm mb-8 max-w-2xl">View all upcoming Texas BHA events in one place. This calendar syncs automatically — events are updated in real time.</p>
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
            <iframe
              src="https://calendar.google.com/calendar/embed?showTitle=0&showNav=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago"
              title="Texas BHA Google Calendar"
              className="w-full border-0"
              style={{ height: '600px' }}
              frameBorder="0"
              scrolling="no"
              data-testid="calendar-embed"
            />
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            To display your own calendar, replace the embed URL in the admin settings with your Google Calendar public embed link.
          </p>
        </div>
      </section>

      <Separator className="bg-slate-100" />

      {/* What We Do */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Capabilities</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>What We Do</h2>
          <p className="text-slate-500 text-sm mb-10 max-w-2xl">Our team covers every facet of Texas BHA's public-facing presence and institutional communications.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Megaphone, title: "Event Promotion", desc: "Strategic promotion of conferences, networking events, and chapter activities across all channels." },
              { icon: PenTool, title: "Content Creation", desc: "Producing research briefs, infographics, video content, and stories that showcase our impact." },
              { icon: Globe, title: "Website Management", desc: "Maintaining a professional digital presence that reflects our institutional standards." },
              { icon: Instagram, title: "Social Media", desc: "Managing Instagram, LinkedIn, and X/Twitter with consistent, professional messaging." },
              { icon: BarChart3, title: "Analytics & Growth", desc: "Tracking engagement metrics and optimizing outreach strategy for maximum reach." },
              { icon: Linkedin, title: "Professional Networking", desc: "Building relationships with industry leaders, faculty, and potential sponsors." },
            ].map((item, i) => (
              <Card key={i} data-testid={`outreach-card-${i}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5 text-[#0F172A]" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 bg-slate-50">
        <div className="container-main text-center">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Follow Texas BHA</h3>
          <div className="flex justify-center gap-3 mt-5">
            {[
              { icon: Instagram, href: "https://instagram.com/texasbha", label: "Instagram" },
              { icon: Linkedin, href: "https://linkedin.com/company/texasbha", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com/texasbha", label: "X / Twitter" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" data-testid={`outreach-social-${i}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-sm font-medium text-slate-600 hover:text-[#0F172A]">
                <s.icon className="h-4 w-4" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>Behind the Scenes</h3>
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
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="container-main text-center">
          <h2 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Join Our Marketing Team</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">Creative, strategic, and passionate about healthcare? We'd welcome you on the team.</p>
          <Link to="/contact" data-testid="outreach-cta">
            <Button className="mt-5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-7 text-sm font-semibold">
              Get Involved <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
