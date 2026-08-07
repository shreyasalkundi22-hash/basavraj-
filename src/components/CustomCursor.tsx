import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const style = window.getComputedStyle(target);
        const clickable =
          style.cursor === 'pointer' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') !== null ||
          target.closest('a') !== null;
        setIsHovered(clickable);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Don't render on touch screens
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Click Ripple Shockwave Animation */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
            className="absolute -ml-5 -mt-5 w-10 h-10 rounded-full border border-[#00f0ff] bg-[#00f0ff]/10"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </AnimatePresence>

      {/* Main Animated Cursor Dot */}
      <motion.div
        animate={{
          x: position.x - (isHovered ? 8 : 4),
          y: position.y - (isHovered ? 8 : 4),
          scale: isClicking ? 0.75 : isHovered ? 1.6 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 35,
          mass: 0.1,
        }}
        className={`fixed rounded-full transition-colors duration-200 ${
          isHovered
            ? 'w-4 h-4 bg-[#00f0ff] shadow-[0_0_15px_#00f0ff]'
            : 'w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(0,240,255,0.8)]'
        }`}
      />
    </div>
  );
};
