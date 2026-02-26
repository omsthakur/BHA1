import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Settings, BarChart3, Shield, Cpu, Search, ArrowRight, CheckCircle2, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { projects as projectsData, consultingServices } from "../data";

const iconMap = {
  target: Target, settings: Settings, "bar-chart": BarChart3,
  shield: Shield, cpu: Cpu, search: Search,
};

export default function Consulting() {
  const services = consultingServices;
  const projects = projectsData;
  const ongoingScrollRef = useRef(null);
  const completedScrollRef = useRef(null);

  const completedProjects = projects.filter(p => p.status === "completed");
  const ongoingProjects = projects.filter(p => p.status === "ongoing");

  const scrollOngoing = (direction) => {
    if (ongoingScrollRef.current) {
      const scrollAmount = 340;
      ongoingScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollCompleted = (direction) => {
    if (completedScrollRef.current) {
      const scrollAmount = 340;
      completedScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
              <p className="text-slate-500 mt-3 leading-relaxed text-[15px]">Our consulting committee brings together talented students and mentors who deliver real-world value to healthcare organizations. From strategic planning to operational efficiency, we tackle the most pressing challenges in healthcare business.</p>
              <p className="text-xs text-slate-400 mt-4 italic">Upload your team photo via the admin panel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Projects — First content after team photo */}
      <section data-testid="ongoing-projects" className="py-16 bg-slate-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-amber-600" />
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Current Work</p>
            </div>
            {ongoingProjects.length > 3 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollOngoing('left')}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all"
                  data-testid="scroll-left"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-600" />
                </button>
                <button
                  onClick={() => scrollOngoing('right')}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all"
                  data-testid="scroll-right"
                >
                  <ChevronRight className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            )}
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Ongoing Projects</h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 max-w-2xl">Active initiatives making progress across our teams.</p>
          <div 
            ref={ongoingScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ongoingProjects.map((project, idx) => (
              <Card key={project.id || idx} data-testid={`ongoing-project-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden group flex-shrink-0 w-[320px]">
                <div className="h-40 overflow-hidden relative">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 left-3 bg-amber-500 text-white text-xs">Ongoing</Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{project.title}</h3>
                  <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">{project.description}</p>
                  {project.outcome && (
                    <div className="mt-3 p-2.5 bg-amber-50 border border-amber-100 rounded-lg">
                      <p className="text-amber-800 text-xs font-medium">Status: {project.outcome}</p>
                    </div>
                  )}
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {project.tags?.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-500">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section data-testid="services-section" className="py-16 bg-white">
        <div className="container-main">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Capabilities</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Consulting Services</h2>
          <p className="text-slate-500 text-sm mb-8 max-w-2xl">Specialized services blending academic rigor with practical business strategy.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => {
              const IconComp = iconMap[service.icon] || Target;
              return (
                <Card key={service.id || idx} data-testid={`service-card-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                      <IconComp className="h-5 w-5 text-[#0F172A]" />
                    </div>
                    <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{service.title}</h3>
                    <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section data-testid="completed-projects" className="py-16 bg-slate-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Portfolio</p>
            </div>
            {completedProjects.length > 3 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollCompleted('left')}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all"
                  data-testid="completed-scroll-left"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-600" />
                </button>
                <button
                  onClick={() => scrollCompleted('right')}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all"
                  data-testid="completed-scroll-right"
                >
                  <ChevronRight className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            )}
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Completed Projects</h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 max-w-2xl">Showcasing the impactful work our teams have delivered.</p>
          <div 
            ref={completedScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {completedProjects.map((project, idx) => (
              <Card key={project.id || idx} data-testid={`completed-project-${idx}`} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden group flex-shrink-0 w-[320px]">
                <div className="h-40 overflow-hidden relative">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 left-3 bg-emerald-600 text-white text-xs">Completed</Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-[15px] text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{project.title}</h3>
                  <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">{project.description}</p>
                  {project.outcome && (
                    <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg">
                      <p className="text-emerald-800 text-xs font-medium">Impact: {project.outcome}</p>
                    </div>
                  )}
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {project.tags?.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-500">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="container-main text-center">
          <h2 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Interested in Working With Us?</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">Whether you're a healthcare organization or a student looking to contribute, we'd welcome the conversation.</p>
          <Button data-testid="consulting-cta" className="mt-5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full px-7 text-sm font-semibold">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
