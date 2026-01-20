
import React from 'react';
import type { SlideContent } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

interface SidebarProps {
  slides: SlideContent[];
  currentSlideIndex: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  goToSlide: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  slides,
  currentSlideIndex,
  isOpen,
  setIsOpen,
  goToSlide,
}) => {
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <>
      {/* Capa de superposición para móviles mejorada */}
      <div
        className={`lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed lg:relative top-0 left-0 h-full w-80 bg-white text-slate-800 flex flex-col z-50 transition-all duration-500 ease-in-out border-r border-slate-100 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.05)] lg:shadow-none
                   ${isOpen ? 'translate-x-0' : '-translate-x-full lg:w-0 lg:opacity-0 lg:pointer-events-none'}`}
      >
        {/* Header del Sidebar - Más amplio y despejado */}
        <div className="p-8 pb-6 border-b border-slate-50 relative shrink-0">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4 shrink-0">
              <div className="p-3 bg-sky-500 rounded-[1.25rem] shadow-xl shadow-sky-100 transform -rotate-3 group-hover:rotate-0 transition-transform">
                <BookOpenIcon />
              </div>
              <div className="overflow-hidden">
                <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-tight truncate">
                  Latin Theological
                </h1>
                <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest block truncate mt-0.5">Módulo 1b · Lección 2</span>
              </div>
            </div>
            
            {/* Botón de Colapso - Más grande, visible y con feedback visual claro */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-300 flex items-center justify-center bg-slate-50 rounded-xl shadow-sm border border-slate-100 active:scale-90"
              title="Colapsar Menú"
            >
              <ChevronLeftIcon />
            </button>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-end text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
               <span className="leading-none">Progreso Lectura</span>
               <span className="text-sky-500 text-xs leading-none bg-sky-50 px-2 py-1 rounded-md">{Math.round(progress)}%</span>
             </div>
             <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-[2px]">
               <div className="h-full bg-sky-500 rounded-full transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)" style={{ width: `${progress}%` }}></div>
             </div>
          </div>
        </div>

        {/* Listado de diapositivas con mejor espaciado */}
        <nav className="flex-1 overflow-y-auto py-8 px-6 custom-scrollbar">
          <ul className="space-y-3">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                <button
                  onClick={() => goToSlide(index)}
                  className={`w-full text-left px-5 py-5 rounded-[1.5rem] transition-all duration-400 flex items-center gap-4 group relative ${
                    currentSlideIndex === index
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                    <span className={`flex-shrink-0 w-9 h-9 rounded-[1rem] text-xs flex items-center justify-center font-black transition-all duration-500 ${
                        currentSlideIndex === index 
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-400/30 scale-110'
                        : index < currentSlideIndex 
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-slate-50 text-slate-300 group-hover:bg-white group-hover:text-slate-600'
                    }`}>
                      {index < currentSlideIndex ? '✓' : index + 1}
                    </span>
                    <span className={`text-[11px] font-black uppercase tracking-[0.15em] truncate ${currentSlideIndex === index ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                      {slide.title}
                    </span>
                    
                    {currentSlideIndex === index && (
                      <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                    )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del Sidebar con diseño limpio */}
        <div className="p-8 border-t border-slate-50 shrink-0 bg-slate-50/30">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Docente</p>
            <p className="text-xs font-bold text-slate-800">Johnny Sangoquiza</p>
          </div>
          <button className="w-full bg-slate-900 text-white py-4.5 rounded-[1.25rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-sky-500 hover:shadow-2xl hover:shadow-sky-200 transition-all active:scale-95 shadow-lg shadow-slate-100">
            Descargar Guía
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
