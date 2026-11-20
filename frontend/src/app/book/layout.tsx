import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Tour",
  description: "Schedule a private viewing of Motwani Constructions properties.",
  openGraph: {
    title: "Book a Tour | Motwani Constructions",
    description: "Reserve your property tour slot with Motwani Constructions.",
    url: "https://motwaniconstructions.com/book",
  },
  keywords: ["book property tour", "Motwani Constructions booking", "real estate tour"],
  alternates: {
    canonical: "https://motwaniconstructions.com/book",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
