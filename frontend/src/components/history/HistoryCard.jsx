import { FiTrash2 } from 'react-icons/fi';
import { resolveImageUrl } from '../../services/api.js';
import GlassCard from '../ui/GlassCard.jsx';

export default function HistoryCard({ item, onDelete }) {
  const isHealthy = item.status === 'healthy';
  const date = new Date(item.predicted_at);

  return (
    <GlassCard className="flex items-center gap-4 p-4">
      <img
        src={resolveImageUrl(item.image_url)}
        alt={`${item.plant} leaf`}
        className="h-20 w-20 shrink-0 rounded-xl object-cover bg-canopy-50 dark:bg-canopy-800"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-harvest-500 dark:text-harvest-300">
            {item.plant}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              isHealthy
                ? 'bg-canopy-100 text-canopy-700 dark:bg-canopy-700/50 dark:text-cream-100'
                : 'bg-harvest-100 text-harvest-700 dark:bg-harvest-700/30 dark:text-harvest-200'
            }`}
          >
            {item.status}
          </span>
        </div>
        <h3 className="font-display font-semibold text-canopy-700 dark:text-cream-100 truncate">
          {item.disease}
        </h3>
        <p className="mt-0.5 text-xs text-soil-light dark:text-cream-200/60">
          {date.toLocaleDateString()} · {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-3">
        <span className="font-mono text-sm font-semibold text-canopy-700 dark:text-cream-100">
          {item.confidence.toFixed(1)}%
        </span>
        <button
          onClick={() => onDelete(item.id)}
          aria-label="Delete this prediction"
          className="text-soil-light hover:text-harvest-600 dark:text-cream-200/50 dark:hover:text-harvest-300 transition-colors"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </GlassCard>
  );
}
