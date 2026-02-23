import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Tag } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const statusColors = {
  "Active Research": "bg-blue-100 text-blue-700 border-blue-200",
  "Policy Brief Published": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Data Collection": "bg-amber-100 text-amber-700 border-amber-200",
  "In Progress": "bg-slate-100 text-slate-700 border-slate-200",
};

export default function Policy() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    axios.get(`${API}/policies`).then(r => setPolicies(r.data)).catch(console.error);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Committee</p>
          <h1 data-testid="policy-page-title" className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Policy & Research
          </h1>
          <p className="text-slate-300 mt-4 text-base max-w-2xl">Evidence-based research and policy analysis driving meaningful change in Texas healthcare.</p>
        </div>
      </section>

      {/* Research Team Photo */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Our Research Team</h2>
              <p className="text-slate-500 mt-3 leading-relaxed">The Policy & Research Committee conducts rigorous analysis of healthcare policy issues affecting Texas communities. Our research teams work with faculty advisors, industry experts, and government stakeholders to produce impactful policy briefs.</p>
              <p className="text-xs text-slate-400 mt-4 italic">Upload your team photo via the admin panel</p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100">
              <img src="https://images.pexels.com/photos/8761541/pexels-photo-8761541.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Research team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Policy Topics */}
      <section data-testid="policy-section" className="py-20 bg-white">
        <div className="container-main max-w-4xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Current Research Topics</h2>
            <p className="text-slate-500 mt-2">Explore the healthcare policy areas our research teams are currently investigating.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {policies.map((policy, idx) => (
              <AccordionItem
                key={policy.id || idx}
                value={`policy-${idx}`}
                data-testid={`policy-item-${idx}`}
                className="border border-slate-200 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-start gap-4 text-left">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="h-5 w-5 text-[#0F172A]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {policy.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge className={`text-xs ${statusColors[policy.status] || statusColors["In Progress"]}`}>
                          {policy.status}
                        </Badge>
                        {policy.category && (
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-500">
                            {policy.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-0">
                  <div className="ml-14">
                    <p className="text-slate-600 leading-relaxed">{policy.summary}</p>
                    {policy.tags?.length > 0 && (
                      <div className="flex items-center gap-2 mt-4 flex-wrap">
                        <Tag className="h-3.5 w-3.5 text-slate-400" />
                        {policy.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs text-slate-500 border-slate-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-4">
                      Resources and downloadable PDFs will be available as research concludes.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Research Process */}
      <section className="py-20 bg-slate-50">
        <div className="container-main max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>Our Research Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Topic Selection", desc: "Identifying pressing healthcare policy issues in Texas" },
              { step: "02", title: "Data Collection", desc: "Gathering quantitative and qualitative data from multiple sources" },
              { step: "03", title: "Analysis", desc: "Rigorous analysis using established research methodologies" },
              { step: "04", title: "Publication", desc: "Publishing policy briefs and presenting findings to stakeholders" },
            ].map((item, i) => (
              <div key={i} data-testid={`research-step-${i}`} className="text-center p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                <span className="text-4xl font-bold text-slate-200" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.step}</span>
                <h3 className="font-bold text-[#0F172A] mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
