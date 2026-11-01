import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import FeaturedStudios from '@/components/home/FeaturedStudios';
import CategoryBrowse from '@/components/home/CategoryBrowse';
import HowBookingWorks from '@/components/home/HowBookingWorks';
import HostGuarantee from '@/components/home/HostGuarantee';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Banner / Hero Slider (>= 3 slides, high-res visuals, CTAs) */}
      <HeroSlider />

      {/* 2. Featured Studios Section (Dynamic from MongoDB .limit(6)) */}
      <FeaturedStudios />

      {/* 3. Browse by Studio Categories (Photo, Sound Stage, Podcast, Music, Art) */}
      <CategoryBrowse />

      {/* 4. Extra Section 1: How Booking Works (4-Step Workflow) */}
      <HowBookingWorks />

      {/* 5. Extra Section 2: Host Guarantee & Creator Support (Assurances) */}
      <HostGuarantee />
    </div>
  );
}
