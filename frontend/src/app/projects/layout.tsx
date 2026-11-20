import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Motwani Constructions' portfolio of premium real estate projects. View ongoing and completed construction.",
  openGraph: {
    title: "Projects | Motwani Constructions",
    description: "Browse premium residential and commercial projects. View ongoing and completed developments.",
    url: "https://motwaniconstructions.com/projects",
  },
  keywords: ["Motwani Constructions projects", "ongoing projects", "completed projects", "real estate India", "top builders"],
  alternates: {
    canonical: "https://motwaniconstructions.com/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
