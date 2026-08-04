import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';
import ConfidenceBar from '../ui/ConfidenceBar.jsx';
import DiseaseInfoTabs from './DiseaseInfoTabs.jsx';
import GlassCard from '../ui/GlassCard.jsx';
import { resolveImageUrl } from '../../services/api.js';

export default function ResultCard({ result }) {
  const isHealthy = result.status === 'healthy';
  const predictedAt = new Date(result.predicted_at);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="overflow-hidden">
        {/* Status banner */}
        <div
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
            isHealthy
              ? 'bg-canopy-100/70 text-canopy-700 dark:bg-canopy-700/50 dark:text-cream-100'
              : 'bg-harvest-50 text-harvest-700 dark:bg-harvest-700/20 dark:text-harvest-200'
          }`}
        >
          {isHealthy ? <FiCheckCircle /> : <FiAlertCircle />}
          {isHealthy ? 'No disease detected — plant looks healthy' : 'Disease detected'}
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8">
          <div>
            <img
              src={resolveImageUrl(result.image_url)}
              alt={`Uploaded leaf — ${result.plant}`}
              className="w-full rounded-xl object-cover max-h-80 bg-canopy-50 dark:bg-canopy-800"
            />
            <div className="mt-3 flex items-center gap-1.5 text-xs text-soil-light dark:text-cream-200/60">
              <FiClock size={13} />
              Predicted {predictedAt.toLocaleString()}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-harvest-500 dark:text-harvest-300">
              {result.plant}
            </p>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-canopy-700 dark:text-cream-100">
              {result.disease}
            </h3>
            <p className="mt-3 text-sm text-soil-light dark:text-cream-200/70 leading-relaxed">
              {result.description}
            </p>

            <div className="mt-6">
              <ConfidenceBar value={result.confidence} status={result.status} />
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8">
          <DiseaseInfoTabs data={result} />
        </div>
      </GlassCard>
    </motion.div>
  );
}
