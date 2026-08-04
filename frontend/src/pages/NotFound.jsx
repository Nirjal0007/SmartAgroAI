import { FiArrowLeft } from 'react-icons/fi';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-mono text-sm text-harvest-500 dark:text-harvest-300">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-canopy-700 dark:text-cream-100">
        This leaf wasn't in the frame
      </h1>
      <p className="mt-4 max-w-md text-soil-light dark:text-cream-200/70">
        The page you're looking for doesn't exist. Let's get you back to somewhere useful.
      </p>
      <div className="mt-8">
        <Button to="/" variant="accent" size="lg">
          <FiArrowLeft /> Back home
        </Button>
      </div>
    </section>
  );
}
