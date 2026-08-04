import { motion } from 'framer-motion';
import { FiZap, FiBookOpen, FiClock, FiShield, FiBarChart2, FiMoon } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';
import GlassCard from '../ui/GlassCard.jsx';

const FEATURES = [
  { icon: FiZap, title: 'Instant results', copy: 'Predictions return in 1–3 seconds thanks to a model kept warm in memory.' },
  { icon: FiBookOpen, title: 'Full disease profiles', copy: 'Symptoms, causes, treatment, and prevention for every one of 38 classes.' },
  { icon: FiClock, title: 'Searchable history', copy: 'Every prediction is saved with image, plant, disease, and timestamp.' },
  { icon: FiBarChart2, title: 'Field statistics', copy: 'See your most detected diseases and plants across every scan you\'ve run.' },
  { icon: FiShield, title: 'Confidence you can read', copy: 'A clear percentage and progress bar — never a black-box verdict.' },
  { icon: FiMoon, title: 'Built for the field', copy: 'Responsive layout with dark mode for greenhouse and outdoor use.' },
];

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why SmartAgroAI"
          title="Everything you need to act on a diagnosis"
          description="Not just a label — the context to actually treat the plant."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <GlassCard className="p-6 h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-canopy-50 dark:bg-canopy-700/50 text-canopy-600 dark:text-harvest-300">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-lg text-canopy-700 dark:text-cream-100">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-soil-light dark:text-cream-200/70">{f.copy}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
