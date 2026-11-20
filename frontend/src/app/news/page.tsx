"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Calendar, ChevronRight, Clock, Search, X, Share2, Bookmark, Eye } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CinematicReveal from "../../components/CinematicReveal";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const featuredStory: Article = {
    id: "featured-1",
    title: "Motwani Constructions: Honored as Real Estate Goodwill Ambassador",
    excerpt:
      "Motwani Constructions, a well-known name in Odisha’s real estate sector, has achieved a remarkable milestone—25 years of delivering quality homes and building communities. This achievement was recently recognized at the Times Business Awards 2024, where the company was honoured with the title of Real Estate Goodwill Ambassador.",
    tag: "Times Business Awards 2024",
    category: "Awards & Recognition",
    date: "September 12, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1600607687944-d85c13b28b76?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  };

  const articles: Article[] = [
    {
      id: "art-1",
      title: "How to Buy Your First Home in Bhubaneswar",
      excerpt:
        "Navigating the Bhubaneswar real estate market for your first home can be seamless when you know what to look for. From land titles to RERA compliance, here is your definitive buyer roadmap.",
      tag: "duplex for sale in Bhubaneswar",
      category: "Blog",
      date: "August 28, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1600566752229-250ed79470f7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "art-2",
      title: "3 Signs That You Are Ready To Buy Your Dream Home In 2025",
      excerpt:
        "Financial stability, long-term city settlement plans, and favorable home loan rates indicate it is the ideal time to invest in your forever sanctuary in Odisha.",
      tag: "Buying home in Bhubaneswar",
      category: "Blog",
      date: "August 14, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "art-3",
      title: "2 BHK Flat Price in Bhubaneswar: A Complete Guide for Homebuyers",
      excerpt:
        "Understand micro-market pricing trends across Patia, Jayadev Vihar, Sundarpada, and Ghatikia to make informed property valuation decisions.",
      tag: "2 BHK flat price in Bhubaneswar",
      category: "Blog",
      date: "July 30, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "art-4",
      title: "Affordable Luxury New Flats for Sale in Ghatikia, Bhubaneswar",
      excerpt:
        "Discover how modern architectural framing, smart biophilic layouts, and proximity to Chandaka forest make Ghatikia the top residential hub.",
      tag: "Ready-to-Move Flats in Ghatikia Bhubaneswar",
      category: "Blog",
      date: "July 18, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "art-5",
      title: "Where are the Best Locations to Invest in Real Estate?",
      excerpt:
        "An in-depth analysis of emerging infrastructure corridors in Nakhara, Pahala, Tamando, and Siula offering high rental yields and capital appreciation.",
      tag: "Flats in Ghatikia Bhubaneswar for Sale",
      category: "Blog",
      date: "June 25, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "art-6",
      title: "Top 3 Reasons for Investing Early in a Real Estate Project",
      excerpt:
        "Early stage booking yields maximum price advantage, customization choices for floor layouts, and flexible installment schedules.",
      tag: "Real Estate Project",
      category: "Blog",
      date: "June 10, 2025",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "art-7",
      title: "Ways to Fund Your Down Payment for Real Estate",
      excerpt:
        "Smart financial planning strategies: systematically allocating mutual funds, leveraging EPF withdrawal options, and selecting PMAY subsidies.",
      tag: "New Flats in Ghatikia Bhubaneswar",
      category: "Blog",
      date: "May 22, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1600566753381-b7537b019812?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "art-8",
      title: "Flats with Modern Amenities in Bhubaneswar: A Guide to Luxurious Living",
      excerpt:
        "Explore clubhouses, swimming pools, EV charging stations, 3-tier safety protocols, and landscaped biophilic gardens in luxury developments.",
      tag: "Flats with Modern Amenities in Bhubaneswar",
      category: "Blog",
      date: "May 05, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "art-9",
      title: "3 Types of GST in the Real Estate Sector",
      excerpt:
        "Demystifying CGST, SGST, and IGST implications on under-construction vs ready-to-move residential properties under RERA regulation.",
      tag: "GST in real estate sector",
      category: "Blog",
      date: "April 18, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenArticle = (art: Article) => {
    setSelectedArticle(art);
    setIsArticleModalOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredArticles.length));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#D95D16] selection:text-white relative font-sans">
      
      {/* Shared Header Navigation */}
      <Header />

      {/* Top Spacer */}
      <div className="h-28" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        
        {/* ── 01 HERO SECTION ── */}
        <section className="mb-20 text-left max-w-4xl">
          <CinematicReveal className="flex flex-col gap-3">
            <span className="text-[#D95D16] text-xs font-mono font-bold uppercase tracking-[0.4em] block">
              INSIGHTS & EDITORIALS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight font-bold text-gray-900 leading-tight uppercase">
              News
            </h1>
            <h2 className="text-xl sm:text-2xl font-serif text-gray-700 font-normal leading-relaxed mt-1">
              &ldquo;Our people are dedicated to finding solutions to every challenge. That spirit makes for some great stories.&rdquo;
            </h2>
          </CinematicReveal>
        </section>

        {/* ── 02 FEATURED SPOTLIGHT STORY ── */}
        <section className="mb-24">
          <CinematicReveal className="w-full">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 group">
              
              {/* Featured Image Left */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-900">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden z-10" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#D95D16] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Award size={13} />
                    <span>Times Business Awards 2024</span>
                  </span>
                </div>
              </div>

              {/* Featured Story Text Right */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between gap-6 bg-gradient-to-br from-white via-white to-orange-50/30">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#D95D16] font-bold">
                    <span>{featuredStory.category}</span>
                    <span>•</span>
                    <span className="text-gray-400 font-normal">{featuredStory.date}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight group-hover:text-[#D95D16] transition-colors">
                    {featuredStory.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                    {featuredStory.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                    <Clock size={13} />
                    {featuredStory.readTime}
                  </span>

                  <button
                    onClick={() => handleOpenArticle(featuredStory)}
                    className="bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          </CinematicReveal>
        </section>

        {/* ── 03 ARTICLES GRID WITH SEARCH & FILTER ── */}
        <section className="mb-24 pt-8 border-t border-gray-200">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-2">
              <span className="text-[#D95D16] text-xs font-mono font-bold uppercase tracking-[0.3em]">
                LATEST EDITORIALS & GUIDES
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                News & Editorial Insights
              </h2>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium focus:outline-none focus:border-[#D95D16] transition-colors w-full md:w-80"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.slice(0, visibleCount).map((art, idx) => (
                <CinematicReveal key={art.id} delay={idx * 70} className="h-full">
                  <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                    
                    {/* Article Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#D95D16] text-white px-2.5 py-0.5 rounded shadow-sm">
                          {art.category}
                        </span>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-black/70 text-white px-2.5 py-0.5 rounded backdrop-blur-xs max-w-[180px] truncate">
                          {art.tag}
                        </span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                          <span>{art.date}</span>
                          <span>{art.readTime}</span>
                        </div>

                        <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#D95D16] transition-colors leading-snug">
                          {art.title}
                        </h3>

                        <p className="text-xs text-gray-600 leading-relaxed font-sans">
                          {art.excerpt}
                        </p>
                      </div>

                      <button
                        onClick={() => handleOpenArticle(art)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95D16] font-mono uppercase tracking-wider pt-4 border-t border-gray-100 w-full cursor-pointer hover:text-[#c2410c] transition-colors"
                      >
                        <span>Read full article</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </article>
                </CinematicReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
              <Search size={32} className="mx-auto text-gray-400 mb-3" />
              <h4 className="text-base font-bold text-gray-800">No matching articles found</h4>
              <p className="text-xs text-gray-500 mt-1">Try searching with a different term like &ldquo;Bhubaneswar&rdquo; or &ldquo;GST&rdquo;.</p>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredArticles.length && (
            <div className="text-center mt-14">
              <button
                onClick={handleLoadMore}
                className="bg-white hover:bg-gray-50 border-2 border-[#D95D16] text-[#D95D16] text-xs font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Load More Articles</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}

        </section>
      </main>

      {/* ── ARTICLE READER MODAL ── */}
      {isArticleModalOpen && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl relative border border-gray-200 my-8">
            
            <button
              onClick={() => setIsArticleModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D95D16] text-white px-3 py-1 rounded">
                  {selectedArticle.category}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-gray-100 text-gray-700 px-3 py-1 rounded">
                  {selectedArticle.tag}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-gray-400 border-b border-gray-100 pb-4">
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
                <span>•</span>
                <span>By Motwani Editorial Team</span>
              </div>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  sizes="600px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-4 text-sm text-gray-700 leading-relaxed font-sans">
                <p className="font-medium text-base text-gray-900">
                  {selectedArticle.excerpt}
                </p>
                <p>
                  As Bhubaneswar rapidly expands into one of Eastern India’s top IT and educational hubs, real estate development by established players like Motwani Constructions continues to set benchmark standards in structural durability, RERA transparency, and biophilic architectural designs.
                </p>
                <p>
                  Whether you are seeking 2 BHK or 3 BHK luxury residences in Ghatikia, Sundarpada, Nakhara, or Pahala, Motwani Constructions ensures on-time delivery, premium fittings, and 25 years of trusted craftsmanship.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/contact"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="bg-[#D95D16] text-white text-xs font-extrabold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c2410c] transition-colors"
                >
                  Inquire About Properties
                </Link>

                <button
                  onClick={() => alert("Article link copied to clipboard!")}
                  className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:text-[#D95D16] hover:border-[#D95D16] transition-colors cursor-pointer"
                  title="Share Article"
                >
                  <Share2 size={16} />
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
