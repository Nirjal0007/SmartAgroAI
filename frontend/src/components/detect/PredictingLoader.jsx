import { motion } from 'framer-motion';

export default function PredictingLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="relative h-16 w-16">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-canopy-100 dark:border-canopy-700"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-harvest"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        />
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-canopy-700 dark:text-cream-100">Analyzing leaf…</p>
        <p className="text-sm text-soil-light dark:text-cream-200/60">Usually takes 1–3 seconds</p>
      </div>
    </div>
  );
}
