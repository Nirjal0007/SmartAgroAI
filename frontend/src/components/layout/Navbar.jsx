import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext.jsx';
import Button from '../ui/Button.jsx';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/detect', label: 'Detect Disease' },
  { to: '/history', label: 'History' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-card' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-canopy-700 dark:text-cream-100">
          <LeafMark />
          SmartAgro<span className="text-harvest">AI</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-canopy-50 text-canopy-700 dark:bg-canopy-700/60 dark:text-cream-100'
                    : 'text-soil-light hover:bg-canopy-50/60 dark:text-cream-200/70 dark:hover:bg-canopy-700/40'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 text-soil-light hover:bg-canopy-50 dark:text-cream-200 dark:hover:bg-canopy-700/50 transition-colors"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <Button to="/detect" variant="accent" size="sm">
            Try It Now
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-canopy-700 dark:text-cream-100"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-white/30 px-6 py-4 flex flex-col gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-medium ${
                  isActive ? 'bg-canopy-50 text-canopy-700 dark:bg-canopy-700/60 dark:text-cream-100' : 'text-soil-light dark:text-cream-200/70'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-sm font-medium text-soil-light dark:text-cream-200"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <Button to="/detect" variant="accent" size="sm">
              Try It Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function LeafMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2C8 2 3 9 3 17c0 7 6 13 13 13 1 0 2-3 2-8 0-9 5-14 12-16-3-2-8-4-14-4Z" fill="currentColor" className="text-canopy dark:text-harvest" />
      <path d="M16 2c6 0 11 2 14 4-7 2-12 7-12 16 0 5-1 8-2 8" stroke="#E8873A" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
