import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Send, Calendar, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { newsletters as newslettersData } from "../data";

export default function Newsletter() {
  const newsletters = newslettersData;
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please fill in all fields."); return; }
    setLoading(true);
    // Static site: simulate subscription
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setSubscribed(true);
      setForm({ name: "", email: "" });
      setLoading(false);
    }, 500);
  };

  const featured = newsletters[0];
  const archive = newsletters.slice(1);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Stay Connected</p>
          <h1 data-testid="newsletter-page-title" className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Newsletter</h1>
          <p className="text-slate-300 mt-4 text-base max-w-2xl">Stay up-to-date with the latest from Texas BHA — events, projects, opportunities, and more.</p>
        </div>
      </section>

      {/* Featured / Latest Article */}
      {featured && (
        <section data-testid="featured-newsletter" className="py-16 lg:py-20 bg-white">
          <div className="container-main">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Latest Issue</p>
            <Card className="overflow-hidden border border-slate-100 shadow-md">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto bg-slate-100 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-400">{featured.date && new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {featured.title}
                  </h2>
                  <p className="text-slate-500 text-[15px] mt-3 leading-relaxed">{featured.preview}</p>
                  <Button className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-6 text-sm font-semibold w-fit">
                    Read Full Issue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      <Separator className="bg-slate-100" />

      {/* Newsletter Sign-up — Middle */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Subscribe</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Get the Newsletter</h2>
              <p className="text-slate-500 mt-3 leading-relaxed text-[15px]">
                Join healthcare business professionals and students who receive our updates featuring:
              </p>
              <ul className="mt-4 space-y-2">
                {["Event announcements and conference updates", "Committee highlights and project showcases", "Internship and career opportunities", "Policy research summaries and insights", "Chapter news and expansion updates"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0F172A] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="border border-slate-100 shadow-md">
              <CardContent className="p-7">
                {subscribed ? (
                  <div className="text-center py-6" data-testid="subscribe-success">
                    <Mail className="h-10 w-10 text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-[#0F172A] mt-3" style={{ fontFamily: 'Manrope, sans-serif' }}>You're Subscribed!</h3>
                    <p className="text-slate-500 text-sm mt-1.5">Check your inbox for a welcome email.</p>
                    <Button onClick={() => setSubscribed(false)} variant="outline" className="mt-4 rounded-full text-xs">Subscribe Another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} data-testid="newsletter-form" className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-[#0F172A]" />
                      <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Sign Up</h3>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Name</Label>
                      <Input data-testid="newsletter-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="mt-1 bg-white" required />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</Label>
                      <Input data-testid="newsletter-email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="mt-1 bg-white" required />
                    </div>
                    <Button data-testid="newsletter-submit" type="submit" disabled={loading} className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full font-semibold text-sm">
                      {loading ? "Subscribing..." : "Subscribe"} <Send className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-[10px] text-slate-400 text-center">We respect your privacy. Unsubscribe anytime.</p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="bg-slate-100" />

      {/* Archive — Bottom */}
      <section data-testid="newsletter-archive" className="py-16 lg:py-20 bg-white">
        <div className="container-main max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-[#0F172A]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Past Issues</p>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>Newsletter Archive</h2>
          <div className="space-y-3">
            {archive.map((nl, idx) => (
              <Card key={nl.id || idx} data-testid={`newsletter-archive-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{nl.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-400">{nl.date && new Date(nl.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                      <p className="text-slate-500 text-sm mt-2">{nl.preview}</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full text-xs shrink-0 border-slate-200">
                      Read <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {archive.length === 0 && newsletters.length <= 1 && (
              <p className="text-slate-400 text-sm text-center py-8">No archived newsletters yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
