import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC<{ targetDate?: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '03',
    hours: '14',
    minutes: '22',
    seconds: '45',
  });

  useEffect(() => {
    const end = targetDate ? new Date(targetDate).getTime() : Date.now() + 3 * 86400000;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-3 text-center my-6 max-w-sm">
      <div className="bg-white/90 backdrop-blur-xs border border-earth-200 p-3 rounded-lg shadow-sm">
        <span className="font-serif text-2xl font-bold text-primary block">{timeLeft.days}</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Days</span>
      </div>
      <div className="bg-white/90 backdrop-blur-xs border border-earth-200 p-3 rounded-lg shadow-sm">
        <span className="font-serif text-2xl font-bold text-primary block">{timeLeft.hours}</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Hours</span>
      </div>
      <div className="bg-white/90 backdrop-blur-xs border border-earth-200 p-3 rounded-lg shadow-sm">
        <span className="font-serif text-2xl font-bold text-primary block">{timeLeft.minutes}</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Minutes</span>
      </div>
      <div className="bg-white/90 backdrop-blur-xs border border-earth-200 p-3 rounded-lg shadow-sm">
        <span className="font-serif text-2xl font-bold text-primary block">{timeLeft.seconds}</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Seconds</span>
      </div>
    </div>
  );
};
