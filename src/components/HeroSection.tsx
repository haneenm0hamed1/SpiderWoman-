import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import BlobCursor from './BlobCursor';
import SpiderDrop from './SpiderDrop';

const CONTENT = {
  gwen: { 
    bg: "/spiderwoman-bg.jpg", 
    titleColor: "text-gwen-red", 
    sub: "Ghost Spider" 
  },
  rival: { 
    bg: "/rival-bg.jpg", 
    titleColor: "text-gwen-pink", 
    sub: "Spider Woman" 
  }
};

export default function HeroSection() {
  const [theme, setTheme] = useState<'gwen' | 'rival'>('gwen');
  
  const current = CONTENT[theme];
  // الخلفية اللي هتظهر جوه الـ Blob هي الخلفية التانية (المخفية)
  const hiddenBg = theme === 'gwen' ? CONTENT.rival.bg : CONTENT.gwen.bg;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-anton">
      
      {/* 1. الخلفية الأساسية */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img 
          src={current.bg} 
          alt="Background" 
          className="w-full h-full object-cover" 
        />
      </div>

      <BlobCursor hiddenBg={hiddenBg} />

      <header className="absolute top-0 left-0 w-full !p-8 flex justify-between items-center z-30">
        <div className="w-32">
           <p className="text-gwen-red font-bold text-2xl tracking-tighter italic">SPIDER-VERSE</p>
        </div>
        
        <button 
          onClick={() => setTheme(p => p === 'gwen' ? 'rival' : 'gwen')}
          className="!p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:scale-110 transition cursor-pointer"
        >
          <Shuffle size={24} />
        </button>
      </header>

      {/* 4. النصوص الرئيسية */}
      <div className="relative z-20 h-full flex flex-col justify-center px-12 pointer-events-none">
        <div className={`${current.titleColor} transition-colors duration-500 drop-shadow-2xl`}>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] uppercase leading-[0.8] tracking-tighter">
    Spider
  </h1>
  <h2 className="text-6xl md:text-8xl lg:text-[9rem] uppercase leading-[0.8] tracking-tighter ml-10 md:ml-20">
    Woman
  </h2>
        </div>
        
  
      </div>

      {/* 5. اللوجو الصغير اللي تحت (Floating Card) */}
      <div className="absolute bottom-12 right-12 z-30">
        <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300">
          <img src="/logo-card.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
      </div>

      <SpiderDrop />

    </div>
  );
}