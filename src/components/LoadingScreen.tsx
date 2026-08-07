import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("INITIALIZING GAMING ARENA...");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next > 30 && next < 60) setStageText("CONNECTING PS5 MATRIX STATIONS...");
        if (next >= 60 && next < 85) setStageText("SYNCING LIVE HUBLI AVAILABILITY...");
        if (next >= 85) setStageText("READY TO LEVEL UP...");
        return Math.min(next, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090909] text-white select-none overflow-hidden"
      >
        {/* Clean Center Glass Card */}
        <div className="glass-card relative z-10 p-10 md:p-14 rounded-3xl max-w-md w-full mx-4 flex flex-col items-center border border-white/10 text-center shadow-2xl">
          {/* Logo Emblem */}
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#0077b6] p-0.5 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-[#090909] rounded-[14px] flex items-center justify-center">
                <Gamepad2 className="w-10 h-10 text-[#00f0ff]" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-100 to-[#00f0ff] bg-clip-text text-transparent mb-1 font-display">
            BASAVRAJ
          </h2>
          <p className="text-xs tracking-[0.3em] font-mono text-[#00f0ff] uppercase mb-6 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Gaming Centre • Hubli
          </p>

          {/* Glass Progress Bar */}
          <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden p-0.5 border border-white/10 mb-4 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#0077b6] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          {/* Progress Percent & Status Text */}
          <div className="flex items-center justify-between w-full font-mono text-xs text-white/60">
            <span className="truncate max-w-[220px] text-left text-cyan-300">{stageText}</span>
            <span className="font-bold text-[#00f0ff] ml-2">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
