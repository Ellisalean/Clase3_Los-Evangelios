
import React, { useState } from 'react';
import type { SlideContent } from './types';
import { CrownIcon } from './components/icons/CrownIcon';
import { HandsIcon } from './components/icons/HandsIcon';
import { HeartIcon } from './components/icons/HeartIcon';
import { BookIcon } from './components/icons/BookIcon';
import { CloseIcon } from './components/icons/CloseIcon';

// --- Reusable Modern Components ---

const SlideHeader: React.FC<{ title: string; subtitle?: string; step?: string }> = ({ title, subtitle, step }) => (
  <div className="w-full mb-12 animate-fade-in">
    <div className="flex items-center gap-4 mb-4">
      {step && <span className="bg-sky-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-sky-100">{step}</span>}
      <div className="h-[1px] flex-1 bg-slate-100"></div>
    </div>
    <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter uppercase leading-none">{title}</h2>
    {subtitle && <p className="text-slate-400 font-semibold mt-3 text-lg">{subtitle}</p>}
  </div>
);

const InfoModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  subtitle: string; 
  extraInfo: string[];
}> = ({ isOpen, onClose, title, subtitle, extraInfo }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 transform animate-scale-up">
        <div className="p-12">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-800">
            <CloseIcon />
          </button>
          <span className="text-sky-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">{subtitle}</span>
          <h3 className="text-4xl font-black text-slate-800 mb-8 tracking-tighter">{title}</h3>
          <div className="space-y-6">
            {extraInfo.map((info, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2 shrink-0 shadow-lg shadow-sky-200"></div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">{info}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={onClose}
            className="mt-12 w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-sky-500 transition-all shadow-xl"
          >
            Entendido, cerrar panel
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalCard: React.FC<{ 
  title: string; 
  subtitle: string; 
  desc: string; 
  extraInfo: string[]; 
  color: string;
}> = ({ title, subtitle, desc, extraInfo, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const colorMap: Record<string, string> = {
    sky: 'border-sky-500 bg-sky-50/50',
    indigo: 'border-indigo-500 bg-indigo-50/50',
    slate: 'border-slate-800 bg-slate-50/50'
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer transition-all duration-500 rounded-[2.5rem] border-t-[6px] p-8 shadow-sm hover:shadow-xl group relative overflow-hidden h-full flex flex-col justify-between ${colorMap[color] || colorMap.sky} hover:-translate-y-2`}
      >
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 block mb-2">{subtitle}</span>
          <h3 className="text-2xl font-black text-slate-800 leading-tight mb-4">{title}</h3>
          <p className="text-slate-600 leading-relaxed text-sm font-medium line-clamp-3">{desc}</p>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest">Ver más detalles</span>
          <div className="h-[1px] flex-1 bg-sky-200 opacity-50"></div>
        </div>
      </div>
      <InfoModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title={title} 
        subtitle={subtitle} 
        extraInfo={extraInfo} 
      />
    </>
  );
};

// --- Multi-Question Quiz for the whole lesson ---
const LessonQuiz: React.FC = () => {
  const questions = [
    {
      q: "¿Cuál fue la ocupación original de Mateo que influyó en el orden del libro?",
      opts: ["Pescador", "Recaudador de impuestos", "Carpintero"],
      correct: 1,
      feedback: "Su pasado como recaudador le dio una mente sistemática y organizada."
    },
    {
      q: "¿Qué frase usa Mateo 32 veces para referirse al Reino?",
      opts: ["Reino de Dios", "Reino Mesiánico", "Reino de los Cielos"],
      correct: 2,
      feedback: "Es una frase característica de Mateo que respeta la sensibilidad judía."
    },
    {
      q: "¿Por qué Mateo organiza la genealogía en grupos de 14?",
      opts: ["Por el valor numérico de 'David'", "Por facilidad de memoria", "Porque así era el canon"],
      correct: 0,
      feedback: "En hebreo, el nombre 'David' suma 14, enfatizando el linaje real."
    },
    {
      q: "¿Cuál es el mandato central de la Gran Comisión?",
      opts: ["Ir por todo el mundo", "Hacer discípulos", "Bautizar a las naciones"],
      correct: 1,
      feedback: "El imperativo central es 'Hacer discípulos'; ir y bautizar son los medios."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleNext = () => {
    if (selectedOpt === questions[currentIdx].correct) setScore(s => s + 1);
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl text-center animate-scale-up">
        <h4 className="text-2xl font-black text-slate-800 mb-4">¡Prueba Final Completada!</h4>
        <div className="text-6xl font-black text-sky-500 mb-6">{score} / {questions.length}</div>
        <p className="text-slate-500 font-medium mb-8">Has repasado los puntos vitales del Evangelio de Mateo.</p>
        <button 
          onClick={() => {setCurrentIdx(0); setScore(0); setQuizFinished(false); setSelectedOpt(null); setShowFeedback(false);}}
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-sky-500 transition-all"
        >
          Reiniciar Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 shadow-xl w-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest">Pregunta {currentIdx + 1} de {questions.length}</span>
        <div className="h-1 flex-1 mx-4 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-sky-500 transition-all" style={{width: `${((currentIdx + 1)/questions.length)*100}%`}}></div>
        </div>
      </div>
      <h4 className="text-xl font-black text-slate-800 mb-8 leading-tight">{questions[currentIdx].q}</h4>
      <div className="space-y-3 mb-8">
        {questions[currentIdx].opts.map((opt, i) => (
          <button 
            key={i}
            disabled={showFeedback}
            onClick={() => setSelectedOpt(i)}
            className={`w-full p-5 rounded-2xl text-left font-bold transition-all border-2 ${
              selectedOpt === i ? 'border-sky-500 bg-sky-50 text-sky-600' : 'bg-white border-white hover:border-slate-200'
            } ${showFeedback && i === questions[currentIdx].correct ? 'border-green-500 bg-green-50' : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>
      {!showFeedback ? (
        <button 
          disabled={selectedOpt === null}
          onClick={() => setShowFeedback(true)}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest disabled:opacity-50"
        >
          Verificar
        </button>
      ) : (
        <div className="animate-fade-in">
          <p className="text-sm font-medium text-slate-600 mb-6 p-4 bg-white rounded-xl border border-slate-100 leading-relaxed">
            {selectedOpt === questions[currentIdx].correct ? "¡Excelente! " : "Nota: "} {questions[currentIdx].feedback}
          </p>
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-sky-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-sky-100"
          >
            Siguiente Pregunta
          </button>
        </div>
      )}
    </div>
  );
};

// --- Slides Content ---

const Slide1: React.FC = () => (
  <div className="w-full max-w-6xl animate-fade-in p-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
    <div className="flex-1 text-center lg:text-left">
      <span className="px-5 py-2 bg-sky-50 text-sky-600 rounded-2xl text-xs font-black uppercase tracking-[0.3em] mb-8 inline-block shadow-sm">LTS · Módulo 1b · Lección 2</span>
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-800 leading-[0.85] tracking-tighter">
        Mateo: <br/> <span className="text-sky-500">El Rey</span>
      </h1>
      <p className="text-2xl text-slate-500 mt-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">Presentando a Jesús como el Mesías, el Rey prometido en el Antiguo Testamento.</p>
      <div className="mt-16 flex gap-6 justify-center lg:justify-start items-center">
        <div className="h-1.5 w-24 bg-sky-500 rounded-full shadow-lg shadow-sky-100"></div>
        <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Por Johnny Sangoquiza</span>
      </div>
    </div>
    <div className="flex-1 flex justify-center w-full">
      <div className="relative w-full max-w-[450px] lg:max-w-[550px]">
        <div className="absolute -inset-16 bg-sky-100 blur-[120px] rounded-full opacity-40 animate-pulse"></div>
        <img 
          src="https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/56bc094a-8eeb-41e0-b05d-cc2964ce09fa_rw_1200.png?h=4919a74310d222067c6c4f2b31d08e15" 
          className="relative w-full h-auto rounded-[4rem] shadow-2xl border-[12px] border-white transform lg:-rotate-2 transition-transform duration-1000 hover:rotate-0 z-10 block" 
          alt="Mateo el Evangelista" 
        />
      </div>
    </div>
  </div>
);

const Slide2: React.FC = () => (
  <div className="w-full max-w-5xl animate-fade-in px-6 flex flex-col items-center">
    <SlideHeader title="Introducción" subtitle="Propósito y características únicas" step="PASO 01" />
    <div className="flex flex-col items-center gap-16 w-full">
      <div className="w-full max-w-4xl aspect-video bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-[12px] border-white relative mb-8">
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/xoVdvN3UYls?modestbranding=1&rel=0&showinfo=0" 
          title="Video Mateo" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start w-full">
        <div className="space-y-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Datos Clave</h3>
          <ul className="space-y-4">
            {[
              { label: "Autor", val: "Mateo (Leví), recaudador de impuestos." },
              { label: "Fecha", val: "Aproximadamente 63-66 d.C." },
              { label: "Propósito", val: "Presentar a Jesús como el cumplimiento de las profecías." },
              { label: "Extensión", val: "28 capítulos, 21,162 palabras." }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sky-500 shadow-lg shadow-sky-200"></span>
                <p className="text-slate-600 font-bold"><span className="text-slate-800 uppercase text-[10px] tracking-widest mr-2">{item.label}:</span> {item.val}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
           <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Pregunta Rápida</h4>
           <p className="font-bold text-slate-800 mb-4">¿Quién era el destinatario principal de Mateo?</p>
           <p className="text-sm text-slate-500 leading-relaxed">Principalmente los judíos del primer siglo, para demostrar que Jesús es el cumplimiento legal y espiritual del trono de David.</p>
        </div>
      </div>
    </div>
  </div>
);

const Slide3: React.FC = () => (
  <div className="w-full max-w-6xl animate-fade-in p-6">
    <SlideHeader title="Estructura Temática" subtitle="Un libro organizado en columnas" step="PASO 02" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-10">
        <p className="text-2xl text-slate-500 leading-relaxed font-medium">
          Mateo es un libro temático. Debido a su pasado como cobrador de impuestos, agrupa los dichos de Jesús de manera sistemática en <span className="text-sky-500 font-black">seis divisiones principales</span>.
        </p>
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6 shadow-2xl">
          <h4 className="font-black text-sky-400 text-sm uppercase tracking-widest">Características Literarias</h4>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shrink-0 text-[10px] font-black">✓</div>
              <p className="text-slate-300 font-medium">Más de 60 referencias al Antiguo Testamento.</p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shrink-0 text-[10px] font-black">✓</div>
              <p className="text-slate-300 font-medium">La frase "Reino de los Cielos" aparece 32 veces.</p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shrink-0 text-[10px] font-black">✓</div>
              <p className="text-slate-300 font-medium">Agrupa enseñanzas en 5 discursos principales.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute -inset-10 bg-sky-100 blur-[80px] rounded-full opacity-20"></div>
        <img src="https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/70ae6ed5-329b-4618-9b9b-fa764f07f481_rw_1920.png?h=92e35c4ab1015963495c7ac487c7c61c" className="relative rounded-[3rem] border-8 border-white shadow-2xl transition-transform group-hover:scale-105 duration-700" alt="Estructura" />
      </div>
    </div>
  </div>
);

const Slide4: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);

  const periods = [
    { 
      title: "Abraham hasta David", 
      desc: "14 generaciones · Establece el linaje real del Mesías.", 
      icon: "👑",
      details: [
        "Abarca aproximadamente 1,000 años de historia bíblica.",
        "Comienza con la promesa a Abraham: 'En tu simiente serán benditas todas las naciones'.",
        "Establece la base del Trono Mesiánico a través del Rey David.",
        "Mateo enfatiza que Jesús es el heredero de la alianza abrahámica."
      ]
    },
    { 
      title: "David hasta el Exilio", 
      desc: "14 generaciones · Continuidad en medio de la crisis.", 
      icon: "🏛️",
      details: [
        "Representa el auge y la posterior caída de la monarquía en Israel.",
        "Muestra la fidelidad de Dios al preservar el linaje a pesar del pecado del pueblo.",
        "Culmina en la deportación a Babilonia, el punto más bajo de la historia judía.",
        "Incluye a reyes clave como Salomón, Ezequías y Josías."
      ]
    },
    { 
      title: "Exilio hasta Cristo", 
      desc: "14 generaciones · Preparación para la llegada del Rey.", 
      icon: "✨",
      details: [
        "Un periodo de reconstrucción y espera de aproximadamente 600 años.",
        "Abarca los llamados 'años de silencio' donde no hubo revelación profética directa.",
        "Destaca a Zorobabel como líder en el retorno del exilio babilónico.",
        "Termina con José, el padre legal, quien confiere a Jesús el derecho al trono."
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl animate-fade-in p-6">
      <SlideHeader title="Genealogía Real" subtitle="El trasfondo del Rey Mesiánico" step="PASO 03" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-8">
          <blockquote className="border-l-8 border-sky-500 pl-8 py-4">
            <p className="text-2xl text-slate-800 font-black italic tracking-tight leading-tight">
              "Libro de la genealogía de Jesucristo, hijo de David, hijo de Abraham..."
            </p>
            <cite className="block mt-4 text-slate-400 font-black uppercase text-[10px] tracking-widest">Mateo 1:1</cite>
          </blockquote>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Mateo establece el <span className="text-sky-500 font-bold">derecho legal</span> de Jesús al trono. Organiza la historia en grupos de 14, un número simbólico relacionado con el nombre "David" en hebreo.
          </p>
          <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest bg-sky-50 p-4 rounded-xl border border-sky-100">
            PULSA LAS TARJETAS PARA EXPLORAR CADA PERIODO
          </p>
        </div>
        <div className="lg:col-span-2 space-y-6">
          {periods.map((item, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedPeriod(i)}
              className="w-full flex gap-8 items-center p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all hover:-translate-x-2 text-left"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-sky-500 group-hover:text-white transition-all shadow-inner">{item.icon}</div>
              <div className="flex-1">
                <h4 className="text-xl font-black text-slate-800 group-hover:text-sky-600 transition-colors">{item.title}</h4>
                <p className="text-slate-500 font-medium">{item.desc}</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-sky-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={selectedPeriod !== null}
        onClose={() => setSelectedPeriod(null)}
        title={selectedPeriod !== null ? periods[selectedPeriod].title : ""}
        subtitle="Contexto Histórico y Mesiánico"
        extraInfo={selectedPeriod !== null ? periods[selectedPeriod].details : []}
      />
    </div>
  );
};

const Slide5: React.FC = () => (
  <div className="w-full max-w-6xl animate-fade-in p-6">
    <SlideHeader title="Mateo vs Lucas" subtitle="Diferencias y propósitos de las genealogías" step="PASO 04" />
    <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
       <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
         <div className="p-16 space-y-10">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-100">M</div>
             <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Mateo 1:1-17</h3>
           </div>
           <ul className="space-y-4">
             {["Derecho LEGAL a ser Rey de los Judíos.", "Forma ascendente: '...engendró a...'.", "Heredero de las promesas de David.", "Empieza desde Abraham."].map((txt, i) => (
               <li key={i} className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-600">✦ {txt}</li>
             ))}
           </ul>
         </div>
         <div className="p-16 space-y-10 bg-slate-50/50">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">L</div>
             <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Lucas 3:23-38</h3>
           </div>
           <ul className="space-y-4">
             {["Descendencia SANGUÍNEA (línea de María).", "Forma descendente: 'que fue hijo de...'.", "Enfatiza el lado HUMANO de Jesús.", "Empieza desde Adán."].map((txt, i) => (
               <li key={i} className="flex gap-4 items-center p-4 bg-white rounded-2xl border border-slate-200 font-bold text-slate-500">✦ {txt}</li>
             ))}
           </ul>
         </div>
       </div>
       <div className="p-10 bg-sky-500 text-white text-center">
         <p className="text-lg font-black italic">"Sin estos registros, no podríamos afirmar que Jesucristo fue un personaje real que desciende de Dios mismo."</p>
       </div>
    </div>
  </div>
);

const Slide6: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const divisions = [
    { title: "Preparación", ref: "1:1–4:11", desc: "Genealogía, nacimiento y preparación del Rey (Bautismo y Tentación).", img: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/f0b30cbb-ba85-4b73-914e-cdaf97a3811b_rw_1920.png" },
    { title: "Principios", ref: "5:1–7:29", desc: "El Sermón del Monte. Las leyes y ética del Reino de los Cielos.", img: "https://desdelafe.mx/wp-content/uploads/2020/02/cultura-biblica.jpg" },
    { title: "Autenticidad", ref: "8:1–9:38", desc: "Milagros que demuestran autoridad sobre la enfermedad, naturaleza y demonios.", img: "https://i.pinimg.com/736x/be/1e/97/be1e9786c8768ca5979fc1956e25b5e3.jpg" },
    { title: "Programa", ref: "10:1–16:28", desc: "Jesús envía a sus discípulos. Parábolas del Reino y anuncio de muerte.", img: "https://cms-imgp.jw-cdn.org/img/p/1102009472/univ/art/1102009472_univ_lsr_lg.jpg" },
    { title: "Pasión", ref: "17:1–27:66", desc: "Transfiguración, última semana en Jerusalén, crucifixión y sepultura.", img: "https://fmhclarapodesta.org/site/n/c479781d7480a1778f75eae57d51d607.jpg" },
    { title: "Poder", ref: "28:1–20", desc: "Resurrección y la Gran Comisión. El Rey reina con poder eterno.", img: "https://www.churchofjesuschrist.org/bc/content/ldsorg/topics/easter/0001951L.jpg" }
  ];

  return (
    <div className="w-full max-w-6xl animate-fade-in p-6">
      <SlideHeader title="Las 6 Divisiones" subtitle="El programa sistemático de Mateo" step="PASO 05" />
      <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
        {/* Swipeable tabs for mobile vertical - and scrollable for everyone */}
        <div className="flex bg-slate-50 p-2 gap-2 shrink-0 overflow-x-auto custom-scrollbar flex-nowrap touch-pan-x select-none">
          {divisions.map((div, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(i)}
              className={`flex-none px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === i ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-white hover:text-slate-800'}`}
            >
              {div.title}
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col lg:flex-row items-center p-12 lg:p-20 gap-16">
          <div className="lg:w-[45%] h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white shrink-0">
            <img src={divisions[activeTab].img} className="w-full h-full object-cover animate-fade-in" key={divisions[activeTab].img} alt={divisions[activeTab].title} />
          </div>
          <div className="lg:w-[55%] space-y-8 animate-fade-in" key={activeTab}>
            <span className="text-sky-500 font-black text-xs uppercase tracking-[0.3em] block">Mateo {divisions[activeTab].ref}</span>
            <h3 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">{divisions[activeTab].title} del Rey</h3>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed italic border-l-8 border-sky-100 pl-8">{divisions[activeTab].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Slide7: React.FC = () => (
  <div className="w-full max-w-6xl animate-fade-in p-6">
    <SlideHeader title="Enseñanzas Clave" subtitle="Temas transversales del Evangelio" step="PASO 06" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <ModalCard 
        color="sky"
        subtitle="Enfoque Real"
        title="Reino de los Cielos"
        desc="Mateo usa esta frase 32 veces para presentar a Jesús como el Rey Mesiánico."
        extraInfo={[
          "Frase exclusiva de Mateo para respetar la sensibilidad judía con el nombre de Dios.",
          "Establece un reino espiritual que ya está cerca (Mat 3:2).",
          "Diferencia del 'Reino de Dios' usado por los otros evangelistas."
        ]}
      />
      <ModalCard 
        color="indigo"
        subtitle="Escritura"
        title="Cumplimiento"
        desc="Más de 60 referencias que prueban que Jesús cumple las promesas antiguas."
        extraInfo={[
          "Usa fórmulas como: 'Para que se cumpliese lo dicho por el profeta...'",
          "Conecta eventos actuales con profecías de Isaías, Miqueas y Zacarías.",
          "Valida a Jesús ante el lector judío religioso."
        ]}
      />
      <ModalCard 
        color="slate"
        subtitle="Estilo de Vida"
        title="Discipulado"
        desc="Enfatiza el costo y la naturaleza radical de seguir a Jesús."
        extraInfo={[
          "Sermón del Monte (caps 5-7) como el manifiesto del Reino.",
          "Llamado a tomar la cruz (10:38).",
          "Promesa de descanso para los cansados (11:28)."
        ]}
      />
      <ModalCard 
        color="sky"
        subtitle="Comunidad"
        title="La Iglesia"
        desc="Único evangelio que menciona explícitamente la palabra 'Iglesia'."
        extraInfo={[
          "Instrucciones para la disciplina y restauración (cap 18).",
          "Promesa de presencia donde haya dos o tres reunidos.",
          "Fundamento sobre la confesión de Pedro (16:18)."
        ]}
      />
    </div>
  </div>
);

const Slide8: React.FC = () => (
  <div className="w-full max-w-6xl animate-fade-in p-6">
    <SlideHeader title="Resurrección y Comisión" subtitle="El clímax y el envío final" step="PASO 07" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div className="space-y-12">
        <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl space-y-6">
          <h4 className="text-3xl font-black text-slate-800 tracking-tighter leading-none">Victoria & Misión</h4>
          <p className="text-slate-500 font-medium leading-relaxed">
            El capítulo 28 no solo cierra una historia, abre la era de la Iglesia.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {["Autoridad Divina", "Mandato: Hacer Discípulos", "Alcance Universal", "Presencia Eterna"].map((txt, i) => (
              <div key={i} className="p-4 bg-sky-50 rounded-2xl text-[10px] font-black uppercase text-sky-600 tracking-widest text-center shadow-sm">
                {txt}
              </div>
            ))}
          </div>
        </div>
        <LessonQuiz />
      </div>
      <div className="space-y-10">
        <div className="aspect-square rounded-[4rem] overflow-hidden border-[15px] border-white shadow-2xl relative group">
          <img src="https://elmen.pe/wp-content/uploads/2018/04/Resurrecci%C3%B3n-de-Jes%C3%BAs.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Resurreccion" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent flex flex-col justify-end p-12">
            <h4 className="text-4xl font-black text-white tracking-tighter">Victoria sobre la Muerte</h4>
            <p className="text-sky-300 font-bold mt-2">La resurrección valida todo el mensaje del Rey.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide9: React.FC<{ onRestart?: () => void }> = ({ onRestart }) => (
  <div className="w-full max-w-2xl animate-fade-in p-6">
    <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-16 text-white text-center relative overflow-hidden shadow-2xl border-[8px] border-slate-800">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10"></div>
      
      <span className="text-sky-400 font-black text-[10px] uppercase tracking-[0.6em] mb-8 block relative z-10">Conclusión de la Lección 2</span>
      <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10 uppercase tracking-tighter leading-none">Mateo: <br/> El Mesías Rey</h2>
      <p className="text-slate-400 text-lg leading-relaxed mb-12 relative z-10 italic font-semibold max-w-lg mx-auto">
        "El Rey resucitado reina con poder, envía con propósito y acompaña con fidelidad todos los días hasta el fin."
      </p>
      
      <div className="flex justify-center relative z-10">
        <button 
          onClick={onRestart}
          className="px-12 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl font-black uppercase tracking-[0.3em] transition-all transform active:scale-95 shadow-xl shadow-sky-500/30 text-[10px]"
        >
          Reiniciar Lección
        </button>
      </div>
    </div>
  </div>
);

export const SLIDES: SlideContent[] = [
  { id: 1, title: 'Portada Mateo', component: Slide1 },
  { id: 2, title: 'Introducción', component: Slide2 },
  { id: 3, title: 'Estructura Temática', component: Slide3 },
  { id: 4, title: 'Genealogía Real', component: Slide4 },
  { id: 5, title: 'Mateo vs Lucas', component: Slide5 },
  { id: 6, title: 'Las 6 Divisiones', component: Slide6 },
  { id: 7, title: 'Enseñanzas Clave', component: Slide7 },
  { id: 8, title: 'Comisión & Resurrección', component: Slide8 },
  { id: 9, title: 'Reflexión Final', component: Slide9 },
];
