import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Motwani Constructions — Top Builders & Real Estate driven by excellence, insight, and simplicity.",
  openGraph: {
    title: "About Us | Motwani Constructions",
    description: "Discover the vision, expert team, and legacy behind Motwani Constructions.",
    url: "https://motwaniconstructions.com/about",
  },
  keywords: ["Motwani Constructions team", "about Motwani Constructions", "top builders India", "real estate excellence"],
  alternates: {
    canonical: "https://motwaniconstructions.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
