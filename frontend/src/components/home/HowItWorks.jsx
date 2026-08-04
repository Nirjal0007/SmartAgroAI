import { motion } from 'framer-motion';
import { FiCamera, FiCpu, FiClipboard } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';

const STEPS = [
  {
    icon: FiCamera,
    title: 'Photograph the leaf',
    copy: 'Snap or upload a clear photo of a single leaf — good light, filling most of the frame.',
  },
  {
    icon: FiCpu,
    title: 'The CNN analyzes it',
    copy: 'Our trained model resizes, normalizes, and runs the image through 38 disease classes in under 3 seconds.',
  },
  {
    icon: FiClipboard,
    title: 'Get a full diagnosis',
    copy: 'Plant, disease, confidence score, symptoms, causes, and a treatment plan — all in one card.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-canopy-50/50 dark:bg-canopy-800/30">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The process"
          title="From leaf to diagnosis in three steps"
          description="This really is a fixed sequence — each step depends on the one before it."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8 relative">
          {/* connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-canopy-200 dark:bg-canopy-600" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center"
            >
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 dark:bg-canopy-900 border-2 border-canopy-200 dark:border-canopy-600 shadow-card">
                <step.icon size={26} className="text-canopy-600 dark:text-harvest-300" />
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-harvest text-white font-mono text-xs font-semibold">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-canopy-700 dark:text-cream-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-soil-light dark:text-cream-200/70 max-w-xs mx-auto">
                {step.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
