import { NavLink } from 'react-router-dom';
import { FiGithub, FiMail, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-canopy-800 text-cream-200">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-xl font-semibold text-cream-100">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 2C8 2 3 9 3 17c0 7 6 13 13 13 1 0 2-3 2-8 0-9 5-14 12-16-3-2-8-4-14-4Z" fill="#F1A85B" />
            </svg>
            SmartAgro<span className="text-harvest-300">AI</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-cream-200/70">
            Point a camera at a leaf, get a diagnosis in seconds. Built to help growers of every
            size catch plant disease before it spreads.
          </p>
          <div className="mt-5 flex gap-3">
            {[FiGithub, FiTwitter, FiMail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-canopy-700/60 hover:bg-harvest hover:text-canopy-900 transition-colors"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-harvest-300 mb-4">Navigate</h4>
          <ul className="space-y-2.5 text-sm text-cream-200/80">
            <li><NavLink to="/" className="hover:text-cream-100">Home</NavLink></li>
            <li><NavLink to="/detect" className="hover:text-cream-100">Detect Disease</NavLink></li>
            <li><NavLink to="/history" className="hover:text-cream-100">History</NavLink></li>
            <li><NavLink to="/about" className="hover:text-cream-100">About</NavLink></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-harvest-300 mb-4">Support</h4>
          <ul className="space-y-2.5 text-sm text-cream-200/80">
            <li><NavLink to="/contact" className="hover:text-cream-100">Contact</NavLink></li>
            <li><a href="#faq" className="hover:text-cream-100">FAQ</a></li>
            <li><span className="opacity-60">91.17% model accuracy</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10 px-6 py-5 text-center text-xs text-cream-200/50">
        © {new Date().getFullYear()} SmartAgroAI. Built for growers, agronomists, and the curious.
      </div>
    </footer>
  );
}
