import { FiTarget, FiCpu, FiUsers } from 'react-icons/fi';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';

const PILLARS = [
  {
    icon: FiTarget,
    title: 'Our mission',
    copy: 'Put a trained plant pathologist in every grower\'s pocket — catching disease early enough to actually save the crop.',
  },
  {
    icon: FiCpu,
    title: 'The model',
    copy: 'A convolutional neural network trained on the PlantVillage dataset, reaching 91.17% validation accuracy across 38 classes spanning 14 crop species.',
  },
  {
    icon: FiUsers,
    title: 'Who it\'s for',
    copy: 'Home gardeners, smallholder farmers, agronomy students, and anyone who wants a second opinion on a suspicious leaf.',
  },
];

export default function About() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="About"
          title="Plant pathology, in your pocket"
          description="SmartAgroAI pairs a trained computer-vision model with a plain-language disease reference — so a diagnosis always comes with a next step."
        />

        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <GlassCard key={p.title} className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-canopy-50 dark:bg-canopy-700/50 text-canopy-600 dark:text-harvest-300">
                <p.icon size={20} />
              </div>
              <h3 className="mt-4 font-display font-semibold text-lg text-canopy-700 dark:text-cream-100">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-soil-light dark:text-cream-200/70">{p.copy}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-canopy-700 dark:text-cream-100">
            How the pipeline works
          </h2>
          <ol className="mt-6 space-y-4">
            {[
              'Your photo is resized to 224×224 and converted to RGB.',
              'Pixel values are normalized and expanded into a single-image batch.',
              'The CNN — loaded once and kept warm in memory — returns a probability for each of 38 classes.',
              'The highest-probability class is matched against class_names.json, then enriched with symptoms, causes, treatment, and prevention from our disease reference.',
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-harvest text-white font-mono text-xs font-semibold">
                  {i + 1}
                </span>
                <p className="text-soil-light dark:text-cream-200/75 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 rounded-xl2 bg-canopy-50 dark:bg-canopy-800/40 p-6 text-sm text-soil-light dark:text-cream-200/70">
          <strong className="text-canopy-700 dark:text-cream-100">A note on accuracy:</strong> confidence
          scores reflect the model's own certainty, not a guarantee. For high-value crops or borderline
          calls, confirm with a local extension office or agronomist before treating.
        </div>
      </div>
    </section>
  );
}
