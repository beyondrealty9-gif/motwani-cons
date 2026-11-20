import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Motwani Constructions. Enquire about our projects or call us directly.",
  openGraph: {
    title: "Contact Us | Motwani Constructions",
    description: "Reach our team to enquire about ongoing and completed projects or schedule a visit.",
    url: "https://motwaniconstructions.com/contact",
  },
  keywords: ["contact Motwani Constructions", "Motwani Constructions phone number", "real estate enquiry", "get in touch"],
  alternates: {
    canonical: "https://motwaniconstructions.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
