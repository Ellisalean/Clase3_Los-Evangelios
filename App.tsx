
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import NavigationArrows from './components/NavigationArrows';
import { MenuIcon } from './components/icons/MenuIcon';
import { SLIDES } from './constants';
import type { SlideContent } from './types';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const totalSlides = SLIDES.length;

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextSlide, goToPrevSlide]);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 1280) { // Umbral aumentado para EdTech focus
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CurrentSlideComponent = SLIDES[currentSlideIndex].component;

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-slate-800">
      <Sidebar
        slides={SLIDES}
        currentSlideIndex={currentSlideIndex}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        goToSlide={goToSlide}
      />
      <main className={`flex-1 flex flex-col transition-all duration-700 ease-in-out relative bg-white overflow-hidden`}>
        {/* Header persistente con botón de menú muy claro cuando está cerrado */}
        <header className="h-20 flex items-center px-8 border-b border-slate-50 shrink-0 bg-white/90 backdrop-blur-xl z-30 sticky top-0 transition-all duration-500">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-sky-500 transition-all shadow-xl shadow-slate-200 active:scale-90 flex items-center gap-3 animate-fade-in group"
              aria-label="Abrir navegación"
            >
              <MenuIcon />
              <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] pr-2 border-l border-white/20 pl-3">Menú</span>
            </button>
          )}
          
          {!isSidebarOpen && (
            <div className="ml-8 flex items-center gap-3 animate-fade-in opacity-80">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Mateo: El Rey</span>
              <div className="h-1 w-1 rounded-full bg-sky-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-500">{SLIDES[currentSlideIndex].title}</span>
            </div>
          )}
        </header>

        {/* Contenedor Global de Contenido con Scroll Suave */}
        <div className="relative flex-1 flex flex-col items-center overflow-y-auto custom-scrollbar scroll-smooth pt-16 pb-48 px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="w-full max-w-6xl flex items-start justify-center min-h-screen pb-32">
             <div className="w-full h-full transform-gpu">
                <CurrentSlideComponent 
                  key={currentSlideIndex} 
                  onRestart={() => goToSlide(0)}
                />
             </div>
          </div>
        </div>

        {/* Controles de Navegación Flotantes */}
        <div className="fixed bottom-12 right-12 z-50 pointer-events-auto">
          <NavigationArrows
            onPrev={goToPrevSlide}
            onNext={goToNextSlide}
            currentIndex={currentSlideIndex}
            totalSlides={totalSlides}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
