import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FiList, FiBarChart2 } from 'react-icons/fi';
import { fetchHistory, deleteHistoryEntry, clearHistory } from '../services/api.js';
import HistoryCard from '../components/history/HistoryCard.jsx';
import HistoryFilters from '../components/history/HistoryFilters.jsx';
import StatsCharts from '../components/history/StatsCharts.jsx';

export default function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [plant, setPlant] = useState('');
  const [tab, setTab] = useState('history');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHistory();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const plants = useMemo(
    () => [...new Set(items.map((i) => i.plant))].sort(),
    [items]
  );

  const filtered = useMemo(() => {
    return items
      .filter((i) => (plant ? i.plant === plant : true))
      .filter((i) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return i.disease.toLowerCase().includes(q) || i.plant.toLowerCase().includes(q);
      })
      .sort((a, b) => new Date(b.predicted_at) - new Date(a.predicted_at));
  }, [items, search, plant]);

  const handleDelete = async (id) => {
    const prev = items;
    setItems((cur) => cur.filter((i) => i.id !== id));
    try {
      await deleteHistoryEntry(id);
      toast.success('Prediction deleted.');
    } catch (err) {
      setItems(prev);
      toast.error(err.message);
    }
  };

  const handleClearAll = async () => {
    if (items.length === 0) return;
    if (!window.confirm('Clear all prediction history? This cannot be undone.')) return;
    const prev = items;
    setItems([]);
    try {
      await clearHistory();
      toast.success('History cleared.');
    } catch (err) {
      setItems(prev);
      toast.error(err.message);
    }
  };

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-harvest-500 dark:text-harvest-300">
            History
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-canopy-700 dark:text-cream-100">
            Your prediction history
          </h1>
          <p className="mt-3 text-soil-light dark:text-cream-200/70">
            Every leaf you've scanned, searchable and sorted newest first.
          </p>
        </div>

        <div className="mb-8 inline-flex rounded-full bg-canopy-50 dark:bg-canopy-800/50 p-1">
          <TabButton active={tab === 'history'} onClick={() => setTab('history')} icon={FiList} label="History" />
          <TabButton active={tab === 'stats'} onClick={() => setTab('stats')} icon={FiBarChart2} label="Statistics" />
        </div>

        {loading && <p className="text-soil-light dark:text-cream-200/60">Loading history…</p>}
        {error && !loading && (
          <div className="rounded-xl bg-harvest-50 dark:bg-harvest-700/10 border border-harvest-200 dark:border-harvest-700/40 px-5 py-4 text-sm text-harvest-700 dark:text-harvest-200">
            {error}
          </div>
        )}

        {!loading && !error && tab === 'history' && (
          <div>
            <HistoryFilters
              search={search}
              onSearch={setSearch}
              plant={plant}
              onPlant={setPlant}
              plants={plants}
              onClearAll={handleClearAll}
              disabled={items.length === 0}
            />

            <div className="mt-6 space-y-3">
              {filtered.length === 0 && (
                <p className="py-16 text-center text-soil-light dark:text-cream-200/60">
                  {items.length === 0
                    ? "No predictions yet — head to Detect Disease to run your first scan."
                    : 'No results match your search.'}
                </p>
              )}
              {filtered.map((item) => (
                <HistoryCard key={item.id} item={item} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && tab === 'stats' && <StatsCharts items={items} />}
      </div>
    </section>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-canopy text-cream-100 dark:bg-harvest dark:text-canopy-900'
          : 'text-soil-light dark:text-cream-200/70 hover:text-canopy-700'
      }`}
    >
      <Icon size={15} /> {label}
    </button>
  );
}
