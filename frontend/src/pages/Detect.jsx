import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSearch, FiRotateCcw } from 'react-icons/fi';
import UploadBox from '../components/detect/UploadBox.jsx';
import PredictingLoader from '../components/detect/PredictingLoader.jsx';
import ResultCard from '../components/detect/ResultCard.jsx';
import Button from '../components/ui/Button.jsx';
import { predictDisease } from '../services/api.js';

export default function Detect() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const handleFileSelected = (selected) => {
    setFile(selected);
    setResult(null);
    setError(null);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await predictDisease(file);
      setResult(data);
      toast.success('Prediction complete!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-harvest-500 dark:text-harvest-300">
            Detect Disease
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-canopy-700 dark:text-cream-100">
            Upload a leaf photo
          </h1>
          <p className="mt-3 text-soil-light dark:text-cream-200/70 max-w-xl mx-auto">
            Clear, well-lit, single-leaf photos give the most reliable results.
          </p>
        </div>

        <UploadBox
          previewUrl={previewUrl}
          onFileSelected={handleFileSelected}
          onClear={handleClear}
          disabled={loading}
        />

        {file && !loading && !result && (
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={handlePredict} variant="accent" size="lg">
              <FiSearch /> Predict Disease
            </Button>
            <Button onClick={handleClear} variant="ghost" size="lg">
              <FiRotateCcw /> Choose another
            </Button>
          </div>
        )}

        {loading && <PredictingLoader />}

        {error && !loading && (
          <div className="mt-6 rounded-xl bg-harvest-50 dark:bg-harvest-700/10 border border-harvest-200 dark:border-harvest-700/40 px-5 py-4 text-sm text-harvest-700 dark:text-harvest-200">
            {error}
          </div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultsRef}
              className="mt-10 scroll-mt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ResultCard result={result} />
              <div className="mt-6 flex justify-center">
                <Button onClick={handleClear} variant="outline" size="md">
                  <FiRotateCcw /> Analyze another leaf
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
