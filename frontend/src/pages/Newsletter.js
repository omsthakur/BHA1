import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, Calendar, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Newsletter() {
  const [newsletters, setNewsletters] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    axios.get(`${API}/newsletters`).then(r => setNewsletters(r.data)).catch(console.error);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/newsletter/subscribe`, form);
      toast.success(res.data.message);
      setSubscribed(true);
      setForm({ name: "", email: "" });
    } catch { toast.error("Failed to subscribe."); }
    finally { setLoading(false); }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <Badge className="bg-white/10 text-amber-400 border-amber-400/20 mb-4 text-xs">Stay Connected</Badge>
          <h1 data-testid="newsletter-page-title" style={{ fontFamily: 'Manrope, sans-serif' }}>Newsletter</h1>
          <p>Stay up-to-date with the latest from Texas BHA — events, projects, opportunities, and more.</p>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Subscribe to Our Newsletter</h2>
              <p className="text-slate-500 mt-3 leading-relaxed">
                Join hundreds of healthcare business professionals and students who receive our monthly newsletter featuring:
              </p>
              <ul className="mt-4 space-y-3">
                {["Event announcements and conference updates", "Committee highlights and project showcases", "Internship and career opportunities", "Policy research summaries and insights", "Chapter news and expansion updates"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="border border-slate-100 shadow-lg">
              <CardContent className="p-8">
                {subscribed ? (
                  <div className="text-center py-8" data-testid="subscribe-success">
                    <Mail className="h-12 w-12 text-emerald-500 mx-auto" />
                    <h3 className="text-xl font-bold text-[#0F172A] mt-4" style={{ fontFamily: 'Manrope, sans-serif' }}>You're Subscribed!</h3>
                    <p className="text-slate-500 text-sm mt-2">Check your inbox for a welcome email.</p>
                    <Button onClick={() => setSubscribed(false)} variant="outline" className="mt-4 rounded-full text-sm">Subscribe Another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} data-testid="newsletter-form" className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="h-5 w-5 text-[#0F172A]" />
                      <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Sign Up</h3>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Name</Label>
                      <Input data-testid="newsletter-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="mt-1.5 bg-slate-50" required />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Email</Label>
                      <Input data-testid="newsletter-email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="mt-1.5 bg-slate-50" required />
                    </div>
                    <Button data-testid="newsletter-submit" type="submit" disabled={loading} className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full font-semibold">
                      {loading ? "Subscribing..." : "Subscribe"} <Send className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-slate-400 text-center">We respect your privacy. Unsubscribe anytime.</p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Banner */}
      <section className="relative h-64 overflow-hidden">
        <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Team" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/60 flex items-center justify-center">
          <p className="text-white text-lg font-medium tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>Connecting Healthcare Leaders Across Texas</p>
        </div>
      </section>

      {/* Newsletter Archive */}
      <section data-testid="newsletter-archive" className="py-20 bg-slate-50">
        <div className="container-main max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-6 w-6 text-[#0F172A]" />
            <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Newsletter Archive</h2>
          </div>
          <div className="space-y-4">
            {newsletters.map((nl, idx) => (
              <Card key={nl.id || idx} data-testid={`newsletter-archive-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{nl.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-sm text-slate-400">{nl.date && new Date(nl.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                      <p className="text-slate-500 text-sm mt-3">{nl.preview}</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full text-xs shrink-0 border-slate-200">
                      Read <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {newsletters.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-8">No archived newsletters yet. Subscribe to be the first to know!</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
