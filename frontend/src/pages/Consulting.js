import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Settings, BarChart3, Shield, Cpu, Search, ArrowRight, CheckCircle2, Clock } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const iconMap = {
  target: Target, settings: Settings, "bar-chart": BarChart3,
  shield: Shield, cpu: Cpu, search: Search,
};

export default function Consulting() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API}/consulting-services`).then(r => setServices(r.data)).catch(console.error);
    axios.get(`${API}/projects`).then(r => setProjects(r.data)).catch(console.error);
  }, []);

  const completedProjects = projects.filter(p => p.status === "completed");
  const ongoingProjects = projects.filter(p => p.status === "ongoing");

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Committee</p>
          <h1 data-testid="consulting-page-title" className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Consulting & Projects
          </h1>
          <p className="text-slate-300 mt-4 text-base max-w-2xl">Delivering data-driven solutions and applied consulting to healthcare organizations across Texas.</p>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100">
              <img src="https://images.pexels.com/photos/7108403/pexels-photo-7108403.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Consulting team" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Our Consulting Team</h2>
              <p className="text-slate-500 mt-3 leading-relaxed">Our consulting committee brings together talented students and mentors who deliver real-world value to healthcare organizations. From strategic planning to operational efficiency, we tackle the most pressing challenges in healthcare business.</p>
              <p className="text-xs text-slate-400 mt-4 italic">Upload your team photo via the admin panel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section data-testid="services-section" className="py-20 bg-white">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Consulting Services</h2>
          <p className="text-slate-500 mb-10 max-w-2xl">Our committees offer specialized consulting services that blend academic rigor with practical business strategy.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const IconComp = iconMap[service.icon] || Target;
              return (
                <Card key={service.id || idx} data-testid={`service-card-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                      <IconComp className="h-6 w-6 text-[#0F172A]" />
                    </div>
                    <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{service.title}</h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Banner */}
      <section className="relative h-48 md:h-56 overflow-hidden">
        <img src="https://images.pexels.com/photos/7108284/pexels-photo-7108284.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Office" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/40" />
      </section>

      {/* Completed Projects */}
      <section data-testid="completed-projects" className="py-20 bg-slate-50">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Completed Projects</h2>
          </div>
          <p className="text-slate-500 mb-10 max-w-2xl">Showcasing the impactful work our teams have delivered.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project, idx) => (
              <Card key={project.id || idx} data-testid={`completed-project-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="h-44 overflow-hidden relative">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 left-3 bg-emerald-600 text-white text-xs">Completed</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{project.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">{project.description}</p>
                  {project.outcome && (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                      <p className="text-emerald-800 text-xs font-medium">Impact: {project.outcome}</p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {project.tags?.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-600">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section data-testid="ongoing-projects" className="py-20 bg-white">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-6 w-6 text-amber-600" />
            <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Ongoing Projects</h2>
          </div>
          <p className="text-slate-500 mb-10 max-w-2xl">Current initiatives making progress across our committees.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingProjects.map((project, idx) => (
              <Card key={project.id || idx} data-testid={`ongoing-project-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="h-44 overflow-hidden relative">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 left-3 bg-amber-500 text-white text-xs">Ongoing</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{project.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">{project.description}</p>
                  {project.outcome && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <p className="text-amber-800 text-xs font-medium">Status: {project.outcome}</p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {project.tags?.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-600">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Interested in Working With Us?</h2>
          <p className="text-slate-500 mt-2 max-w-lg mx-auto text-sm">Whether you're a healthcare organization or a student looking to contribute, we'd love to connect.</p>
          <Button data-testid="consulting-cta" className="mt-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-8 text-sm font-semibold">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
