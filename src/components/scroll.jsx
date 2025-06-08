import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { calculateSizes } from '../constants/index.js';

const sections = ['home', 'about', 'work', 'contact'];

const ScrollIndicator = () => {
  const [active, setActive] = useState('home');
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });


  useEffect(() => {
    const handleScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActive(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isMobile || isSmall) return null;
  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((sec) => (
        <div
          key={sec}
          className={`w-3 h-3 rounded-full cursor-pointer transition-all relative
            ${active === sec ? 'bg-gradient-to-br from-purple-500 to-cyan-400 scale-110 shadow-lg' : 'bg-purple-800 opacity-40'}
          `}
          title={sec.charAt(0).toUpperCase() + sec.slice(1)}
          onClick={() => scrollTo(sec)}
        >
          <span className="absolute -left-24 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden sm:block">
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScrollIndicator;
