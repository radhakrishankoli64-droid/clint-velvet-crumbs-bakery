import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalHeight > 0) {
        setScrollProgress((scrolled / totalHeight) * 100);
      }

      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll Progress Bar at top of screen */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#D4AF37]/20 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#5D4037] text-[#D4AF37] dark:bg-[#D4AF37] dark:text-stone-950 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border border-[#D4AF37]/40 group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </>
  );
};
