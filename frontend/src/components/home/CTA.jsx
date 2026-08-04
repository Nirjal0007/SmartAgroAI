import { FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button.jsx';

export default function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl rounded-xl2 bg-canopy-700 dark:bg-canopy-800 px-8 py-16 text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(232,135,58,0.5), transparent 60%)' }}
        />
        <h2 className="relative font-display text-3xl sm:text-4xl font-semibold text-cream-100 text-balance">
          Ready to check on your crop?
        </h2>
        <p className="relative mt-4 text-cream-200/75 max-w-xl mx-auto">
          Upload a leaf photo now and get a full diagnosis — plant, disease, confidence, and a
          treatment plan — in seconds.
        </p>
        <div className="relative mt-8">
          <Button to="/detect" variant="accent" size="lg">
            Start Detecting <FiArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
