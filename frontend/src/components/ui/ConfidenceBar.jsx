export default function ConfidenceBar({ value, status = 'diseased' }) {
  const clamped = Math.max(0, Math.min(100, value));
  const barColor = status === 'healthy' ? 'bg-canopy-400' : 'bg-harvest';

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs uppercase tracking-wider text-soil-light dark:text-cream-200/60">
          Confidence
        </span>
        <span className="font-mono text-lg font-semibold text-canopy-700 dark:text-cream-100">
          {clamped.toFixed(2)}%
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-canopy-50 dark:bg-canopy-700/50 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-[width] duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
