"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Check,
  ArrowRight,
  Download,
  Search,
  X,
  PhoneCall,
  Calendar,
  Building,
  Award,
  Sparkles
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  type: string;
  image: string;
  progress: number;
  status: string;
  description: string;
  highlights: string[];
  year?: string;
}

const ongoingProjects: ProjectItem[] = [
  {
    id: "anantam",
    title: "Anantam",
    subtitle: "3 BHK Flats in Jharapada for Sale",
    location: "Jharapada, Bhubaneswar",
    price: "₹85 Lacs - ₹1.2 Cr",
    beds: "3 BHK",
    baths: "3 Baths",
    sqft: "1,650 - 2,100 SqFt",
    type: "Residential Apartments",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    progress: 65,
    status: "Under Construction (Possession 2026)",
    description: "Anantam brings serene living to Jharapada with thoughtfully planned 3 BHK luxury residences. Featuring ambient green landscaping, earthquake-resistant structure, and state-of-the-art community amenities.",
    highlights: ["Prime Jharapada Location", "RERA Approved", "Clubhouse & Gym", "24/7 Multi-tier Security"]
  },
  {
    id: "anandam",
    title: "Anandam",
    subtitle: "Anandam Ghatikia Bhubaneswar",
    location: "Ghatikia, Bhubaneswar",
    price: "₹78 Lacs - ₹1.1 Cr",
    beds: "2 & 3 BHK",
    baths: "2-3 Baths",
    sqft: "1,450 - 1,950 SqFt",
    type: "Luxury Residential Enclave",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    progress: 50,
    status: "Active Structural Construction",
    description: "Anandam at Ghatikia offers a harmonious blend of tranquil nature and contemporary urban architecture. Designed with high ceilings, wide sunlit balconies, and proximity to premier institutes.",
    highlights: ["Proximity to IT Corridor", "Vastu Compliant Layouts", "Sky Garden & Deck", "EV Charging Stations"]
  },
  {
    id: "motwani-sanskruti",
    title: "Motwani Sanskruti",
    subtitle: "3 BHK flats for sale in Kalinga Nagar",
    location: "Kalinga Nagar, Bhubaneswar",
    price: "₹92 Lacs - ₹1.45 Cr",
    beds: "3 & 4 BHK",
    baths: "3-4 Baths",
    sqft: "1,800 - 2,500 SqFt",
    type: "Premium High-Rise Enclave",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    progress: 40,
    status: "Foundation & Framing Phase",
    description: "Celebrating heritage and modern sophistication, Motwani Sanskruti stands as an architectural icon in Kalinga Nagar with lavish 3 BHK and 4 BHK residences featuring panoramic city views.",
    highlights: ["Aerial View Landscaping", "Infinity Edge Swimming Pool", "Solar Powered Common Areas", "Jogging Track"]
  },
  {
    id: "codename-cascade",
    title: "Codename Cascade",
    subtitle: "3 BHK flats for sale in Kalinga Nagar",
    location: "Kalinga Nagar, Bhubaneswar",
    price: "₹88 Lacs - ₹1.35 Cr",
    beds: "3 BHK",
    baths: "3 Baths",
    sqft: "1,720 - 2,200 SqFt",
    type: "Smart Designer Homes",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    progress: 30,
    status: "Structure Elevation in Progress",
    description: "Codename Cascade introduces next-generation smart home automated 3 BHK flats in Kalinga Nagar, combining glass facade views with lush green central courtyards.",
    highlights: ["Smart Home Automation", "Private Sun Decks", "Multipurpose Community Hall", "Rainwater Harvesting"]
  },
  {
    id: "gm-terrace",
    title: "GM Terrace",
    subtitle: "GM terrace - 3 bhk flats for sale in bhubaneswar",
    location: "Nakhara, Bhubaneswar",
    price: "₹72 Lacs - ₹98 Lacs",
    beds: "3 BHK",
    baths: "3 Baths",
    sqft: "1,550 - 1,880 SqFt",
    type: "Terrace Garden Apartments",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    progress: 75,
    status: "Finishing & Interior Fitments",
    description: "GM Terrace offers exclusive terrace balcony living near Nakhara. Designed for families seeking airy spaces, high privacy, and fast access to Cuttack-Bhubaneswar highway.",
    highlights: ["Highway Connectivity", "Private Terrace Balconies", "24/7 Power Backup", "Dedicated Children's Play Zone"]
  },
  {
    id: "bliss",
    title: "Bliss",
    subtitle: "Bliss - 4 BHK Flats in Bhubaneswar for Sale",
    location: "Pahala, Bhubaneswar",
    price: "₹1.45 Cr - ₹2.10 Cr",
    beds: "4 BHK",
    baths: "4 Baths",
    sqft: "2,600 - 3,400 SqFt",
    type: "Ultra-Luxury Estates",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    progress: 55,
    status: "Structure Complete / Interior Work",
    description: "Bliss redefines palatial living with expansive 4 BHK luxury residences in Pahala. Features double-height living rooms, Italian marble flooring, and private elevator lobbies.",
    highlights: ["Ultra-Luxury 4 BHK Layouts", "Private Elevator Access", "Temperature Controlled Pool", "Concierge Service"]
  },
  {
    id: "lordsway-laxmi",
    title: "Lords Way Laxmi",
    subtitle: "LORDS WAY LAXMI - Motwani Constructions",
    location: "Siula, Bhubaneswar",
    price: "₹68 Lacs - ₹95 Lacs",
    beds: "2 & 3 BHK",
    baths: "2-3 Baths",
    sqft: "1,380 - 1,850 SqFt",
    type: "Bespoke Family Enclave",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
    progress: 80,
    status: "Final Handover Phase",
    description: "Lords Way Laxmi is Motwani Constructions' landmark residential development in Siula, offering serene surroundings with top-tier construction standards and Vastu compliance.",
    highlights: ["Near National Highway", "100% Vastu Compliant", "Grand Entrance Gate", "Senior Citizen Park"]
  }
];

const featuredCompletedProjects: ProjectItem[] = [
  {
    id: "bijaylaxmi-enclave",
    title: "Bijaylaxmi Enclave",
    subtitle: "flats in patia for sale",
    location: "TANKA PANI / PATIA",
    price: "Completed (2010)",
    beds: "2 & 3 BHK",
    baths: "2-3 Baths",
    sqft: "1,250 - 1,750 SqFt",
    type: "Residential Landmark",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    progress: 100,
    status: "Fully Handed Over & Occupied",
    description: "Bijaylaxmi Enclave set the benchmark for modern residential comfort in Patia and Tanka Pani, offering robust structural engineering and thriving community spaces.",
    highlights: ["100% Occupied", "Gated Community", "Landscaped Gardens", "Clear Title Deed"],
    year: "2010"
  },
  {
    id: "gymkhana-palm-heights",
    title: "Gymkhana Palm Heights",
    subtitle: "Flats in ShamPur, Bhubaneswar",
    location: "SHAMPUR",
    price: "Completed (2012)",
    beds: "3 BHK",
    baths: "3 Baths",
    sqft: "1,600 - 2,100 SqFt",
    type: "Luxury Gated Enclave",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    progress: 100,
    status: "Fully Handed Over & Occupied",
    description: "Gymkhana Palm Heights at Shampur is a prestigious residential landmark delivered in 2012, boasting lush palm gardens, private gym facilities, and spacious family suites.",
    highlights: ["Delivered 2012", "Sports & Fitness Hub", "Power Backup", "24/7 Security"],
    year: "2012"
  },
  {
    id: "vinayak-enclave",
    title: "Vinayak Enclave",
    subtitle: "Flats for Sale in Sundarpada, Bhubaneswar",
    location: "SUNDERPADA",
    price: "Completed (2016)",
    beds: "2 & 3 BHK",
    baths: "2 Baths",
    sqft: "1,350 - 1,800 SqFt",
    type: "Modern Family Enclave",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    progress: 100,
    status: "Fully Handed Over & Occupied",
    description: "Vinayak Enclave delivered upscale apartment homes in Sundarpada in 2016, establishing a serene living environment with excellent connectivity to central Bhubaneswar.",
    highlights: ["Delivered 2016", "Vastu Compliant", "Covered Parking", "Water Treatment Plant"],
    year: "2016"
  },
  {
    id: "mj-woods",
    title: "MJ Woods",
    subtitle: "Apartments for Sale in Andharua, Bhubaneswar",
    location: "ANDHARUA",
    price: "Completed (2017)",
    beds: "3 BHK",
    baths: "3 Baths",
    sqft: "1,700 - 2,250 SqFt",
    type: "Forest-View Sanctuary",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    progress: 100,
    status: "Fully Handed Over & Occupied",
    description: "MJ Woods in Andharua offers serene woodland views with contemporary architectural flair, delivered with uncompromised quality in 2017.",
    highlights: ["Delivered 2017", "Eco-friendly Design", "Amphitheatre", "Clubhouse Facilities"],
    year: "2017"
  }
];

// Complete Historical Completed Projects 1998 - 2023
const historicalCompletedProjects = [
  { year: "1998", title: "BASANT VILLA APARTMENT", location: "BHOOMIKHAL" },
  { year: "2001", title: "BHAWANI ASHOK ENCLAVE", location: "GANGA NAGAR, UNIT-6" },
  { year: "2002", title: "YASHODHARA ENCLAVE", location: "SAHID NAGAR" },
  { year: "2003", title: "SAUDAMINI ENCLAVE", location: "B.J.B. NAGAR" },
  { year: "2003", title: "MOHARATHA ENCLAVE", location: "BHDDESHWARI COLONY" },
  { year: "2003", title: "LAXMI VIHAR", location: "NANDAN KANAN ROAD" },
  { year: "2003", title: "LAXMI KUTIR", location: "BALLIA PANDA, PURI" },
  { year: "2003", title: "NARAYANI VIP ENCLAVE", location: "VIP COLONY" },
  { year: "2003", title: "SUBHASHREE NILAYAM", location: "IRC VILLAGE" },
  { year: "2003", title: "JYOTSHNA ENCLAVE", location: "JAYADEV VIHAR" },
  { year: "2004", title: "GANESH", location: "JAGAMARA" },
  { year: "2005", title: "DHIRENDER NATH VILLA", location: "VIVEKANAND MARG" },
  { year: "2005", title: "LAXMI NIVAS", location: "CHAKRATIRHA ROAD, PURI" },
  { year: "2006", title: "DAMYANTH HOMES", location: "NAYAPALLY" },
  { year: "2006", title: "LAXMI VIHAR", location: "PURI" },
  { year: "2006", title: "JASODA VIHAR", location: "SAMANTRAPUR" },
  { year: "2007", title: "PALM GREEN", location: "SHYAMPUR" },
  { year: "2007", title: "NA MAJESTIC", location: "JHARPADA" },
  { year: "2008", title: "LAKE VIEW ENCLAVE", location: "MADHUSUDAN NAGAR" },
  { year: "2008", title: "M.M. TOWER", location: "CUTTACK" },
  { year: "2008", title: "NILAPADMA", location: "JHARPADA" },
  { year: "2009", title: "TARINI PALACE", location: "SAHID NAGAR" },
  { year: "2009", title: "AMRITA RESIDENCY", location: "JHARSUGDA" },
  { year: "2009", title: "ARCON", location: "PATIA" },
  { year: "2009", title: "PUJA ENCLAVE", location: "B.J.B. NAGAR" },
  { year: "2010", title: "SASWATI HOMES", location: "PATIA" },
  { year: "2010", title: "BIJAY LAXMI HOMES", location: "TANKA PANI" },
  { year: "2011", title: "CGEWHO HOMES (PH-1)", location: "TOMANDO" },
  { year: "2011", title: "BHARAT ENCLAVE", location: "B.J.B. NAGAR" },
  { year: "2011", title: "AMRITA VIHAR", location: "JHARSUGDA" },
  { year: "2012", title: "GYMKHANA PALM HEIGHTS", location: "SHAMPUR" },
  { year: "2012", title: "AKASHDEEP HOMES", location: "CUTTACK" },
  { year: "2012", title: "UTTAM HOMES", location: "IRC VILLAGE" },
  { year: "2012", title: "ETINA RESIDENCY", location: "OLD TOWN" },
  { year: "2013", title: "SITA ENCLAVE", location: "OLD TOWN" },
  { year: "2013", title: "PRESTIGE RESIDENCY", location: "JHARPADA" },
  { year: "2014", title: "KAILASH ENCLAVE", location: "OLD TOWN" },
  { year: "2014", title: "UTTAM HOMES", location: "CANAL ROAD, GGP COLONY" },
  { year: "2014", title: "GAGANI RESIDENCY", location: "PATIA" },
  { year: "2015", title: "KANIKA DEVI COTTAGES", location: "RANGA BAZAR" },
  { year: "2016", title: "BIJAY LAXMI ENCLAVE", location: "PATIA" },
  { year: "2016", title: "SIBANGI VILLA", location: "SHYAMPUR" },
  { year: "2016", title: "VINAYAK ENCLAVE", location: "SUNDERPADA" },
  { year: "2017", title: "MADHWANI ENCLAVE", location: "NUAGAON" },
  { year: "2017", title: "M J WOODS", location: "ANDHARUA" },
  { year: "2019", title: "LORDSWAY", location: "SIULA" },
  { year: "2021", title: "SAI ENCLAVE", location: "CHOWDWAR, CUTTACK" },
  { year: "2023", title: "UTKAL GREENEX", location: "SUNDERPADA" }
];

function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterQuery = searchParams.get("name") || searchParams.get("filter") || "";
  const tabParam = searchParams.get("tab") || "ongoing";

  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">(
    tabParam === "completed" ? "completed" : "ongoing"
  );
  const [searchTerm, setSearchTerm] = useState(filterQuery);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string>("ALL");

  const filteredOngoing = ongoingProjects.filter(p => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.subtitle.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term)
    );
  });

  const filteredHistorical = historicalCompletedProjects.filter(p => {
    const matchesSearch = !searchTerm || (
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.year.includes(searchTerm)
    );
    const matchesYear = yearFilter === "ALL" || p.year === yearFilter;
    return matchesSearch && matchesYear;
  });

  const handleDownloadBrochure = (projectTitle: string) => {
    setDownloadSuccess(projectTitle);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const yearsList = Array.from(new Set(historicalCompletedProjects.map(p => p.year))).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#D95D16] selection:text-white">
      {/* Header */}
      <Header />

      <div className="h-28" />

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-10 text-center">
        <ScrollReveal>
          <span className="text-[#D95D16] text-xs font-mono uppercase tracking-[0.3em] font-semibold mb-3 block">
            {activeTab === "ongoing" ? "Our Ongoing Work" : "Our Completed Work"}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground tracking-wide font-light mb-6">
            {activeTab === "ongoing" ? "Ongoing Projects" : "Completed Projects"}
          </h1>
          <p className="text-muted text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Building the future of the construction industry, one project at a time.
          </p>

          {/* Tab Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => { setActiveTab("ongoing"); setSearchTerm(""); }}
              className={`px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                activeTab === "ongoing"
                  ? "bg-[#D95D16] text-white shadow-[#D95D16]/20"
                  : "bg-white dark:bg-gray-900 border border-border-color text-muted hover:text-foreground"
              }`}
            >
              Ongoing Projects (7 Active)
            </button>
            <button
              onClick={() => { setActiveTab("completed"); setSearchTerm(""); }}
              className={`px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                activeTab === "completed"
                  ? "bg-[#D95D16] text-white shadow-[#D95D16]/20"
                  : "bg-white dark:bg-gray-900 border border-border-color text-muted hover:text-foreground"
              }`}
            >
              Completed Projects (45+ Landmarks)
            </button>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder={activeTab === "ongoing" ? "Search ongoing projects..." : "Search completed projects or locations..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-border-color rounded-full py-4 pl-12 pr-12 text-sm text-foreground focus:outline-none focus:border-[#D95D16] shadow-lg transition-all font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* Notification */}
      {downloadSuccess && (
        <div className="max-w-md mx-auto bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-500 mb-8 flex items-center gap-3 animate-fade-in-up">
          <Check className="shrink-0" size={18} />
          <div>
            <span className="font-bold block">Spec Kit Initialized</span>
            <span>Brochure details for <strong>{downloadSuccess}</strong> generated.</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pb-24">

        {/* ONGOING PROJECTS TAB */}
        {activeTab === "ongoing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOngoing.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 80}>
                <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-border-color shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                  
                  {/* Image Container */}
                  <div 
                    className="relative h-64 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#D95D16] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                        ONGOING
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <span className="text-xs text-amber-200 font-mono block">{project.type}</span>
                        <h3 className="text-xl font-serif font-light text-white">{project.title}</h3>
                      </div>
                      <span className="text-sm font-bold font-mono text-amber-300">{project.price}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#D95D16] font-mono">
                      <MapPin size={14} className="shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    <p className="text-xs text-muted font-light leading-relaxed font-sans line-clamp-2">
                      {project.subtitle} — {project.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5 text-[11px] font-mono text-muted">
                      <div className="flex justify-between items-center">
                        <span>Status: <strong className="text-foreground">{project.status}</strong></span>
                        <span className="text-[#D95D16] font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-[#D95D16] transition-all duration-1000"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Specs Pill */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-border-color text-xs font-mono text-muted text-center">
                      <div>
                        <span className="text-foreground font-bold block">{project.beds}</span>
                        <span className="text-[10px]">Bedrooms</span>
                      </div>
                      <div className="border-l border-r border-border-color">
                        <span className="text-foreground font-bold block">{project.baths}</span>
                        <span className="text-[10px]">Bathrooms</span>
                      </div>
                      <div>
                        <span className="text-foreground font-bold block">{project.sqft.split(" ")[0]}</span>
                        <span className="text-[10px]">Sq.Ft</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto pt-4 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 bg-[#D95D16] hover:bg-[#c44f0f] text-white font-semibold text-xs py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider font-mono"
                      >
                        <span>View Project</span>
                        <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => handleDownloadBrochure(project.title)}
                        className="p-3 border border-border-color hover:border-[#D95D16] text-foreground hover:text-[#D95D16] rounded-xl transition-all cursor-pointer"
                        title="Download PDF Specs"
                      >
                        <Download size={16} />
                      </button>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* COMPLETED PROJECTS TAB */}
        {activeTab === "completed" && (
          <div className="flex flex-col gap-16">
            
            {/* Featured Completed Grid */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-8 rounded-full bg-[#D95D16]/10 flex items-center justify-center text-[#D95D16]">
                  <Award size={16} />
                </span>
                <div>
                  <h3 className="text-xl font-serif font-light text-foreground">Featured Completed Landmarks</h3>
                  <p className="text-xs text-muted font-mono">Pinnacles of Motwani Constructions engineering</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCompletedProjects.map((project, idx) => (
                  <ScrollReveal key={project.id} delay={idx * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-border-color shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                          COMPLETED {project.year}
                        </span>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h4 className="text-base font-serif font-light text-white">{project.title}</h4>
                          <span className="text-[10px] text-amber-300 font-mono flex items-center gap-1">
                            <MapPin size={10} /> {project.location}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1 gap-3">
                        <p className="text-xs text-muted font-light leading-relaxed line-clamp-2">
                          {project.subtitle} — {project.description}
                        </p>

                        <div className="mt-auto pt-3 border-t border-border-color flex items-center justify-between">
                          <span className="text-[10px] font-mono text-emerald-600 font-bold">100% HANDED OVER</span>
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="text-[11px] font-mono font-bold text-[#D95D16] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Project</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Other Completed Projects Historical Catalog (1998 - 2023) */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-border-color shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border-color pb-6 mb-8">
                <div>
                  <span className="text-[#D95D16] text-xs font-mono uppercase tracking-[0.2em] font-bold block mb-1">
                    25+ YEARS FOOTPRINT (1998 - 2023)
                  </span>
                  <h3 className="text-2xl font-serif font-light text-foreground">Other Completed Projects</h3>
                  <p className="text-xs text-muted font-sans font-light mt-1">
                    Over 50+ iconic residential and commercial complexes across Odisha
                  </p>
                </div>

                {/* Year Filter Pills */}
                <div className="flex flex-wrap gap-1.5 max-w-xl">
                  <button
                    onClick={() => setYearFilter("ALL")}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                      yearFilter === "ALL"
                        ? "bg-[#D95D16] text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-muted hover:text-foreground"
                    }`}
                  >
                    ALL YEARS
                  </button>
                  {yearsList.map(y => (
                    <button
                      key={y}
                      onClick={() => setYearFilter(y)}
                      className={`px-2.5 py-1.5 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        yearFilter === y
                          ? "bg-[#D95D16] text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-muted hover:text-foreground"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table / Grid of All Completed Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHistorical.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-border-color/60 hover:border-[#D95D16]/40 transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono font-bold text-[#D95D16] bg-[#D95D16]/10 px-2 py-0.5 rounded w-fit">
                        {proj.year}
                      </span>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-[#D95D16] transition-colors">
                        {proj.title}
                      </h4>
                      <span className="text-xs text-muted font-mono flex items-center gap-1">
                        <MapPin size={11} className="text-[#D95D16]" /> {proj.location}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded font-bold shrink-0">
                      COMPLETED
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Detailed Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-gray-900 border border-border-color rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="relative h-72 w-full">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#D95D16] text-white text-xs font-mono font-bold uppercase px-3 py-1 rounded-full">
                  {selectedProject.type}
                </span>
                <h2 className="text-3xl font-serif text-white font-light mt-2">{selectedProject.title}</h2>
                <p className="text-amber-200 text-sm font-sans">{selectedProject.subtitle}</p>
              </div>
            </div>

            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-color pb-6">
                <div>
                  <span className="text-xs font-mono text-muted uppercase">Status / Price</span>
                  <p className="text-2xl font-bold font-mono text-[#D95D16]">{selectedProject.price}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-muted uppercase">Location</span>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                    <MapPin size={14} className="text-[#D95D16]" /> {selectedProject.location}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono text-muted uppercase">Status</span>
                  <p className="text-sm font-bold text-foreground font-mono">{selectedProject.status}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#D95D16] font-bold mb-2">Project Overview</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#D95D16] font-bold mb-3">Key Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-border-color">
                      <Check size={16} className="text-[#D95D16]" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-border-color">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    router.push(`/contact?project=${encodeURIComponent(selectedProject.title)}`);
                  }}
                  className="flex-1 bg-[#D95D16] hover:bg-[#c44f0f] text-white font-semibold text-sm py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider font-mono cursor-pointer"
                >
                  <PhoneCall size={16} />
                  <span>Enquire About Properties</span>
                </button>
                <button
                  onClick={() => handleDownloadBrochure(selectedProject.title)}
                  className="px-6 py-4 border border-border-color hover:border-[#D95D16] text-foreground hover:text-[#D95D16] font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider font-mono cursor-pointer"
                >
                  <Download size={16} />
                  <span>Download Project Spec</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Projects() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-foreground flex items-center justify-center">Loading Projects Catalog...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
