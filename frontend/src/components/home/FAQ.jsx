import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';

const FAQS = [
  {
    q: 'How accurate is the prediction?',
    a: 'The underlying CNN reaches 91.17% validation accuracy across 38 plant/disease classes from the PlantVillage dataset. Confidence is shown per-prediction so you can judge each result individually.',
  },
  {
    q: 'What image formats are supported?',
    a: 'JPG, JPEG, and PNG. For best results, use a well-lit, in-focus photo of a single leaf that fills most of the frame.',
  },
  {
    q: 'Is my prediction history private?',
    a: 'History is stored on the server you connect to and is not shared elsewhere. You can delete individual entries or clear your history at any time from the History page.',
  },
  {
    q: 'Which plants and diseases are covered?',
    a: 'Apple, blueberry, cherry, corn, grape, orange, peach, bell pepper, potato, raspberry, soybean, squash, strawberry, and tomato — 38 healthy/diseased classes in total.',
  },
  {
    q: 'Can I use this on a phone in the field?',
    a: 'Yes — the interface is fully responsive and supports dark mode for low-light conditions like a greenhouse or early morning field walk.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />

        <div className="mt-12 divide-y divide-canopy-100 dark:divide-canopy-700">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="py-2">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium text-lg text-canopy-700 dark:text-cream-100">
                    {item.q}
                  </span>
                  <FiChevronDown
                    className={`shrink-0 text-harvest transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-soil-light dark:text-cream-200/70 pr-8">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
