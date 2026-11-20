"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Calendar, MapPin, Clock, ArrowRight, Sparkles, Heart, Users, CheckCircle2, X, Send, Search } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CinematicReveal from "../../components/CinematicReveal";

interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  date: string;
  category: string;
}

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Application Form State
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });

  const eventsGallery = [
    {
      title: "Rewards & Recognition Event 2023-24",
      tag: "Gallery • 74 Photos",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Diwali Celebration 2024",
      tag: "Gallery • Festival",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Christmas Celebration 2024",
      tag: "Gallery • Festive Vibes",
      image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Motwani Cricket League 2025",
      tag: "Gallery • Sports Event",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "International Women's Day (2025) Celebration",
      tag: "Gallery • Empowerment",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Motwani Raja Utsav 2025",
      tag: "Gallery • Cultural Festival",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Motwani-Movie Date Vibes",
      tag: "Gallery • Team Outing",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Motwani Rewards & Recognition 2025",
      tag: "Gallery • Excellence Awards",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Motwani-Diwali Celebration 2025",
      tag: "Gallery • Festival of Lights",
      image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const jobs: JobOpening[] = [
    {
      id: "job-1",
      title: "Executive – PR & Marketing Alliances",
      location: "Project / Head Office",
      type: "Full Time",
      date: "June 15, 2026",
      category: "Marketing",
    },
    {
      id: "job-2",
      title: "Planning & Drafting Executive (AutoCAD)",
      location: "Project / Head Office",
      type: "Full Time",
      date: "February 27, 2026",
      category: "Engineering",
    },
    {
      id: "job-3",
      title: "Tele Caller (Real Estate)",
      location: "Bhubaneswar",
      type: "Full Time",
      date: "February 20, 2026",
      category: "Sales",
    },
    {
      id: "job-4",
      title: "Project Head",
      location: "Project Location",
      type: "Full Time",
      date: "September 10, 2025",
      category: "Management",
    },
    {
      id: "job-5",
      title: "AutoCAD Intern",
      location: "Bhubaneswar",
      type: "Full Time",
      date: "August 5, 2025",
      category: "Engineering",
    },
    {
      id: "job-6",
      title: "Safety Engineer",
      location: "Bhubaneswar & Cuttack",
      type: "Full Time",
      date: "July 19, 2025",
      category: "Engineering",
    },
    {
      id: "job-7",
      title: "Relationship Manager-Sales",
      location: "Cuttack",
      type: "Full Time",
      date: "July 19, 2025",
      category: "Sales",
    },
    {
      id: "job-8",
      title: "Fund / Wealth Manager– AIF",
      location: "Bhubaneswar",
      type: "Full Time",
      date: "May 17, 2025",
      category: "Finance",
    },
    {
      id: "job-9",
      title: "Marketing & Public Relations Executive",
      location: "Bhubaneswar",
      type: "Full Time",
      date: "April 26, 2025",
      category: "Marketing",
    },
    {
      id: "job-10",
      title: "Manager – CRM & Sales",
      location: "Bhubaneswar",
      type: "Full Time",
      date: "February 11, 2025",
      category: "Sales",
    },
    {
      id: "job-11",
      title: "Site Engineer",
      location: "Bhubaneswar",
      type: "Full Time",
      date: "November 15, 2024",
      category: "Engineering",
    },
    {
      id: "job-12",
      title: "Loan Processing Officer",
      location: "Bhubaneswar",
      type: "Full Time",
      date: "November 14, 2024",
      category: "Finance",
    },
  ];

  const categories = ["All", "Engineering", "Sales", "Marketing", "Finance", "Management"];

  const filteredJobs = jobs.filter((j) => {
    const matchesCat = selectedCategory === "All" || j.category === selectedCategory;
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenApplyModal = (job: JobOpening) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
    setFormSubmitted(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setFormSubmitted(false);
      setApplicant({ name: "", email: "", phone: "", experience: "", message: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#D95D16] selection:text-white relative font-sans">
      
      {/* Header Navigation */}
      <Header />

      {/* Top Spacer */}
      <div className="h-28" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        
        {/* ── 01 HERO SECTION ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <CinematicReveal className="flex flex-col gap-3">
              <span className="text-[#D95D16] text-xs font-mono font-bold uppercase tracking-[0.4em] block">
                CAREERS AT MOTWANI CONSTRUCTIONS
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight font-bold text-gray-900 leading-[1.1]">
                The future you want is within reach
              </h1>
            </CinematicReveal>

            <CinematicReveal className="flex flex-col gap-6" delay={150}>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-sans font-medium">
                Join us for a journey of growth, innovation, and opportunity. At Motwani Construction, we empower you to reach new heights in your career. Discover a workplace that values your aspirations and encourages your professional development. Your future starts here.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#openings"
                  className="bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Openings</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#life-at-motwani"
                  className="border border-[#D95D16] text-[#D95D16] hover:bg-[#D95D16]/10 text-xs font-extrabold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
                >
                  Life at Motwani
                </a>
              </div>
            </CinematicReveal>
          </div>

          <div className="lg:col-span-5 relative">
            <CinematicReveal className="w-full">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Motwani Constructions Team Careers"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="text-xs font-mono font-bold text-[#D95D16] bg-black/80 px-3 py-1 rounded-full uppercase tracking-wider">
                    Empowering Talent
                  </span>
                  <h3 className="text-lg font-serif text-white font-normal mt-2">
                    Build your career with Odisha&apos;s premier builder
                  </h3>
                </div>
              </div>
            </CinematicReveal>
          </div>
        </section>

        {/* ── 02 LIFE AT MOTWANI ── */}
        <section id="life-at-motwani" className="mb-28 pt-8 border-t border-gray-200">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <CinematicReveal className="flex flex-col gap-2">
              <span className="text-[#D95D16] text-xs font-mono font-bold uppercase tracking-[0.3em]">
                CULTURE & COMMUNITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Life at Motwani
              </h2>
            </CinematicReveal>

            <CinematicReveal delay={150}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                Motwani Constructions believes that work is an integral part of life’s journey. Our commitment to creating an enriching work environment ensures that your career thrives while you enjoy a fulfilling life outside the office. We prioritize work-life balance, offering flexible arrangements that empower you to excel in your career and enjoy quality time with your loved ones.
              </p>
            </CinematicReveal>
          </div>

          {/* Event Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsGallery.map((evt, idx) => (
              <CinematicReveal key={idx} delay={idx * 80} className="h-full">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-1">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 text-[#D95D16] px-3 py-1 rounded-full border border-white/20">
                        {evt.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#D95D16] transition-colors leading-snug">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        (Click to explore gallery)
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Opening photo gallery for: ${evt.title}`)}
                      className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#D95D16] hover:text-[#c2410c] transition-colors font-mono pt-3 border-t border-gray-100 cursor-pointer"
                    >
                      <span>Explore Gallery</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </CinematicReveal>
            ))}
          </div>
        </section>

        {/* ── 03 CURRENT OPENINGS SECTION ── */}
        <section id="openings" className="mb-24 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-2">
              <span className="text-[#D95D16] text-xs font-mono font-bold uppercase tracking-[0.3em]">
                CAREER OPPORTUNITIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Current Openings
              </h2>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium focus:outline-none focus:border-[#D95D16] transition-colors w-48 sm:w-64"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1 rounded-full border border-gray-200">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#D95D16] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Listings Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <CinematicReveal key={job.id} className="h-full">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6 h-full group border-t-4 border-t-[#D95D16]">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D95D16] bg-[#D95D16]/10 px-2.5 py-0.5 rounded-full border border-[#D95D16]/20">
                          {job.category}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                          <Clock size={11} />
                          {job.type}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 font-sans tracking-tight group-hover:text-[#D95D16] transition-colors leading-snug">
                        {job.title}
                      </h3>

                      <div className="flex flex-col gap-1.5 text-xs text-gray-600 font-sans mt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-[#D95D16] shrink-0" />
                          <span>{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-400 font-mono text-[11px]">
                          <Calendar size={12} className="shrink-0" />
                          <span>Posted: {job.date}</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenApplyModal(job)}
                      className="w-full bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-widest py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>APPLY NOW</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </CinematicReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
              <Briefcase size={32} className="mx-auto text-gray-400 mb-3" />
              <h4 className="text-base font-bold text-gray-800">No matching positions found</h4>
              <p className="text-xs text-gray-500 mt-1">Try adjusting your category filter or search keywords.</p>
            </div>
          )}
        </section>
      </main>

      {/* ── APPLICATION MODAL ── */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Application Submitted!</h3>
                <p className="text-xs text-gray-600 max-w-xs leading-relaxed font-sans">
                  Thank you for applying for <span className="font-bold text-[#D95D16]">{selectedJob.title}</span>. Our HR team will review your application and contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="flex flex-col gap-4">
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D95D16] font-bold">
                    JOB APPLICATION
                  </span>
                  <h3 className="text-xl font-serif font-bold text-gray-900 leading-snug mt-0.5">
                    {selectedJob.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    {selectedJob.location} • {selectedJob.type}
                  </p>
                </div>

                <div className="flex flex-col gap-3 text-xs">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={applicant.name}
                      onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D95D16]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={applicant.email}
                        onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D95D16]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 90901 02626"
                        value={applicant.phone}
                        onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D95D16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Years of Experience</label>
                    <input
                      type="text"
                      placeholder="e.g. 3 Years in Real Estate"
                      value={applicant.experience}
                      onChange={(e) => setApplicant({ ...applicant, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D95D16]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Cover Note / Remarks</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us briefly why you'd be a great fit for this role..."
                      value={applicant.message}
                      onChange={(e) => setApplicant({ ...applicant, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D95D16]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={14} />
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
