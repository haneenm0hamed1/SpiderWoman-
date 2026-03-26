import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function BlobCursor({ hiddenBg }: { hiddenBg: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const size = 350;

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const negativeX = useTransform(springX, (x) => -x);
  const negativeY = useTransform(springY, (y) => -y);

useEffect(() => {
  const handleMove = (e: MouseEvent | TouchEvent) => {
    let x, y;
    if ('touches' in e) {
      // لو موبايل (لمس)
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      // لو كمبيوتر (ماوس)
      x = (e as MouseEvent).clientX;
      y = (e as MouseEvent).clientY;
    }
    mouseX.set(x - size / 2);
    mouseY.set(y - size / 2);
  };

  window.addEventListener("mousemove", handleMove);
  window.addEventListener("touchmove", handleMove); // إضافة اللمس

  return () => {
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("touchmove", handleMove);
  };
}, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <motion.div
        style={{ x: springX, y: springY, width: size, height: size }}
        className="absolute top-0 left-0 overflow-hidden rounded-full border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
      >
        <motion.div 
          className="w-[100vw] h-[100vh] absolute top-0 left-0 scale-110"
          style={{
            x: negativeX,
            y: negativeY,
            backgroundImage: `url(${hiddenBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>
    </div>
  );
}