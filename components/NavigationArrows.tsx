
import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalSlides: number;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({
  onPrev,
  onNext,
  currentIndex,
  totalSlides,
}) => {
  return (
    <div className="flex flex-row items-center gap-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 min-w-max whitespace-nowrap">
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="p-3.5 bg-white rounded-full shadow-sm text-slate-700 hover:bg-sky-500 hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:cursor-not-allowed active:scale-90 border border-slate-50"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon />
      </button>
      
      <div className="px-6 py-2 bg-slate-50 rounded-2xl flex items-center justify-center">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
          <span className="text-sky-500 mr-1.5">{currentIndex + 1}</span>
          <span className="opacity-30 mr-1.5">/</span>
          <span>{totalSlides}</span>
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentIndex === totalSlides - 1}
        className="p-3.5 bg-white rounded-full shadow-sm text-slate-700 hover:bg-sky-500 hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:cursor-not-allowed active:scale-90 border border-slate-50"
        aria-label="Next slide"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default NavigationArrows;
