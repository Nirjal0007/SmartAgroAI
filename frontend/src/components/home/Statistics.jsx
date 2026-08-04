import { motion } from 'framer-motion';

const STATS = [
  { value: '91.17%', label: 'Validation accuracy' },
  { value: '38', label: 'Disease & plant classes' },
  { value: '1–3s', label: 'Average prediction time' },
  { value: '14', label: 'Crop species covered' },
];

export default function Statistics() {
  return (
    <section className="py-20 px-6 bg-canopy-700 dark:bg-canopy-900">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-mono text-3xl sm:text-4xl font-semibold text-harvest-300">{s.value}</p>
            <p className="mt-2 text-sm text-cream-200/70">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
