import { useEffect, useState } from "react";

export default function SpiderDrop() {
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrop(true);
      setTimeout(() => setDrop(false), 2000); // يرجع مكانه بعد 5 ثواني
    }, 5000);   
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-[-250px] right-[10%] z-40 flex flex-col items-center transition-transform duration-[3000ms] ease-in-out"
         style={{ transform: drop ? 'translateY(350px)' : 'translateY(0)' }}>
      
      {/* خيط العنكبوت */}
      <div className="w-[1px] h-[250px] bg-gradient-to-b from-white/50 to-transparent" />
      
      {/* صورة العنكبوت بتاعك */}
      <img 
        src="/spider-icon.jpg" 
        alt="Spider" 
        className="w-12 h-12 object-contain rounded-full border border-red-600/50"
      />
    </div>
  );
}