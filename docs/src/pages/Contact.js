import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", inquiry_type: "General" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // Static site: simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "", inquiry_type: "General" });
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <Badge className="bg-white/10 text-amber-400 border-amber-400/20 mb-4 text-xs">Get in Touch</Badge>
          <h1 data-testid="contact-page-title" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Contact Us
          </h1>
          <p>We'd love to hear from you. Whether you have a question or want to get involved, reach out below.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div data-testid="contact-success" className="text-center py-16">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
                  <h2 className="text-2xl font-bold text-[#0F172A] mt-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Message Sent!
                  </h2>
                  <p className="text-slate-500 mt-2">Thank you for reaching out. We'll get back to you within 1-2 business days.</p>
                  <Button
                    data-testid="send-another-btn"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-6 text-sm font-semibold"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Card className="border border-slate-100 shadow-sm">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium text-slate-700">Name *</Label>
                          <Input
                            id="name"
                            data-testid="contact-name"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="mt-1.5 bg-slate-50 border-slate-200 focus:border-[#0F172A]"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            data-testid="contact-email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="mt-1.5 bg-slate-50 border-slate-200 focus:border-[#0F172A]"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="inquiry_type" className="text-sm font-medium text-slate-700">Inquiry Type</Label>
                        <Select value={form.inquiry_type} onValueChange={v => setForm({ ...form, inquiry_type: v })}>
                          <SelectTrigger data-testid="contact-inquiry-type" className="mt-1.5 bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General Inquiry</SelectItem>
                            <SelectItem value="Membership">Membership</SelectItem>
                            <SelectItem value="Chapters">Chapters</SelectItem>
                            <SelectItem value="Consulting">Consulting</SelectItem>
                            <SelectItem value="Partnerships">Partnerships</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</Label>
                        <Input
                          id="subject"
                          data-testid="contact-subject"
                          placeholder="What is this about?"
                          value={form.subject}
                          onChange={e => setForm({ ...form, subject: e.target.value })}
                          className="mt-1.5 bg-slate-50 border-slate-200 focus:border-[#0F172A]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-slate-700">Message *</Label>
                        <Textarea
                          id="message"
                          data-testid="contact-message"
                          placeholder="Tell us more..."
                          rows={5}
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          className="mt-1.5 bg-slate-50 border-slate-200 focus:border-[#0F172A]"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        data-testid="contact-submit-btn"
                        disabled={loading}
                        className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-8 py-3 text-sm font-semibold w-full sm:w-auto"
                      >
                        {loading ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Contact Information</h3>
                  <p className="text-slate-500 text-sm mt-1">Reach out through any of these channels.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">Email</p>
                      <a href="mailto:info@texasbha.org" className="text-slate-500 text-sm hover:text-[#0F172A] transition-colors">info@texasbha.org</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">Phone</p>
                      <span className="text-slate-500 text-sm">(512) 555-0199</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">Location</p>
                      <span className="text-slate-500 text-sm">Based in Texas</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold text-sm text-[#0F172A] mb-3">Follow Us</h4>
                  <div className="flex gap-3">
                    <a href="https://linkedin.com/company/texasbha" target="_blank" rel="noopener noreferrer" data-testid="contact-linkedin"
                      className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                      <Linkedin className="h-4 w-4 text-[#0F172A]" />
                    </a>
                    <a href="https://twitter.com/texasbha" target="_blank" rel="noopener noreferrer" data-testid="contact-twitter"
                      className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                      <Twitter className="h-4 w-4 text-[#0F172A]" />
                    </a>
                    <a href="https://instagram.com/texasbha" target="_blank" rel="noopener noreferrer" data-testid="contact-instagram"
                      className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                      <Instagram className="h-4 w-4 text-[#0F172A]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
