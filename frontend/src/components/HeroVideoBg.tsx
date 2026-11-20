"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface HeroVideoBgProps {
  videoUrl?: string;
  posterUrl?: string;
}

export default function HeroVideoBg({
  videoUrl = "/hero_video.mp4",
  posterUrl = "/hero_final_frame.jpg",
}: HeroVideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play policy handling
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
      {/* ─── Sharp Crisp 100% Opacity Background Video Layer ─── */}
      {!hasVideoError ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setHasVideoError(true)}
          className="w-full h-full object-cover opacity-100"
        />
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={posterUrl}
            alt="Motwani Constructions Hero Video Showcase"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Ultra-Light Text Contrast Gradient (Left Side Only for Clean Text Readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
