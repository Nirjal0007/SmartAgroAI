import { motion } from 'framer-motion';
import { FiUpload, FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* Ambient field texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(64,145,108,0.16), transparent 42%), radial-gradient(circle at 85% 65%, rgba(232,135,58,0.14), transparent 46%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-canopy-50 dark:bg-canopy-700/50 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-canopy-600 dark:text-harvest-200">
            <span className="h-1.5 w-1.5 rounded-full bg-harvest animate-pulse" />
            91.17% validation accuracy
          </span>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-[3.6rem] leading-[1.05] font-semibold text-canopy-700 dark:text-cream-100 text-balance">
            AI Powered Plant Disease Detection
          </h1>

          <p className="mt-6 text-lg text-soil-light dark:text-cream-200/75 max-w-lg text-balance">
            Photograph a leaf. In under three seconds, SmartAgroAI names the disease, rates its
            confidence, and hands you a treatment plan — trained across 38 crop and disease
            classes from the PlantVillage dataset.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button to="/detect" variant="accent" size="lg">
              <FiUpload /> Upload a Leaf Photo
            </Button>
            <Button to="/about" variant="ghost" size="lg" className="!px-4">
              How it works <FiArrowRight />
            </Button>
          </div>
        </motion.div>

        {/* Signature scan visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="viewfinder relative rounded-xl2 glass p-6 overflow-hidden">
            <div className="vf-tl" />
            <div className="vf-br" />
            <div className="relative rounded-xl overflow-hidden bg-canopy-50 dark:bg-canopy-800 aspect-square flex items-center justify-center">
              <LeafIllustration />
              <div className="scanline" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-5 flex items-center justify-between rounded-xl bg-cream-100/80 dark:bg-canopy-900/60 px-4 py-3"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-soil-light dark:text-cream-200/60">Detected</p>
                <p className="font-display font-semibold text-canopy-700 dark:text-cream-100">Tomato — Early Blight</p>
              </div>
              <span className="font-mono text-lg font-semibold text-harvest-500 dark:text-harvest-300">91.17%</span>
            </motion.div>
          </div>

          <div className="absolute -z-10 -bottom-6 -right-6 h-40 w-40 rounded-full bg-harvest-100/60 dark:bg-harvest-700/10 blur-2xl" />
          <div className="absolute -z-10 -top-8 -left-8 h-32 w-32 rounded-full bg-canopy-100/70 dark:bg-canopy-600/10 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}

function LeafIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="w-2/3 h-2/3 animate-sway origin-bottom" aria-hidden="true">
      <path
        d="M100 20C60 20 30 55 30 100c0 45 35 80 70 80 6 0 10-18 10-45 0-55 30-85 70-95-18-13-48-20-80-20Z"
        fill="#40916C"
        opacity="0.9"
      />
      <path
        d="M100 20c32 0 62 7 80 20-40 10-70 40-70 95 0 27-4 45-10 45"
        stroke="#1B4332"
        strokeWidth="2"
        fill="none"
      />
      <path d="M60 70c15 5 25 15 30 30M55 110c18 2 32 10 40 25" stroke="#E8873A" strokeWidth="1.5" opacity="0.6" fill="none" />
    </svg>
  );
}
