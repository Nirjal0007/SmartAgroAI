import { FiSearch, FiTrash2 } from 'react-icons/fi';

export default function HistoryFilters({ search, onSearch, plant, onPlant, plants, onClearAll, disabled }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-soil-light dark:text-cream-200/50" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by disease or plant…"
            className="w-full rounded-full border border-canopy-200 dark:border-canopy-600 bg-white/70 dark:bg-canopy-800/50 pl-10 pr-4 py-2.5 text-sm text-soil dark:text-cream-100 placeholder:text-soil-light/60 focus:border-harvest outline-none"
          />
        </div>

        <select
          value={plant}
          onChange={(e) => onPlant(e.target.value)}
          className="rounded-full border border-canopy-200 dark:border-canopy-600 bg-white/70 dark:bg-canopy-800/50 px-4 py-2.5 text-sm text-soil dark:text-cream-100 outline-none focus:border-harvest"
        >
          <option value="">All plants</option>
          {plants.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <button
        onClick={onClearAll}
        disabled={disabled}
        className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full px-4 py-2.5 text-sm font-medium text-harvest-600 hover:bg-harvest-50 dark:text-harvest-300 dark:hover:bg-harvest-700/10 transition-colors disabled:opacity-40"
      >
        <FiTrash2 size={15} /> Clear all
      </button>
    </div>
  );
}
