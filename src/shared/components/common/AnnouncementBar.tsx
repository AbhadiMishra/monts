import React, { useState, useEffect } from 'react';
import { brandConfig } from '../../../config/brand';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const features = brandConfig.features;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="bg-primary text-white text-xs py-2 px-4 border-b border-slate-800 font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1))}
          className="p-1 hover:text-accent transition-colors text-slate-400"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="text-center overflow-hidden h-4 flex items-center justify-center">
          <span className="animate-fade-in tracking-wider uppercase text-[11px]">
            {features[currentIndex].title}: {features[currentIndex].description}
          </span>
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % features.length)}
          className="p-1 hover:text-accent transition-colors text-slate-400"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
