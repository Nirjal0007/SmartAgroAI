import { useMemo } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import GlassCard from '../ui/GlassCard.jsx';

const PALETTE = ['#1B4332', '#40916C', '#E8873A', '#F1A85B', '#2D6A4F', '#824314', '#9FD1B6', '#AD5A1B'];

function useAggregates(items) {
  return useMemo(() => {
    const byDisease = {};
    const byPlant = {};
    let confidenceSum = 0;

    items.forEach((item) => {
      byDisease[item.disease] = (byDisease[item.disease] || 0) + 1;
      byPlant[item.plant] = (byPlant[item.plant] || 0) + 1;
      confidenceSum += item.confidence;
    });

    const diseaseData = Object.entries(byDisease)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    const plantData = Object.entries(byPlant)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    // Chronological line: predictions per day, oldest -> newest
    const byDay = {};
    items.forEach((item) => {
      const day = new Date(item.predicted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      byDay[day] = (byDay[day] || 0) + 1;
    });
    const trend = Object.entries(byDay).map(([day, count]) => ({ day, count })).reverse();

    return {
      diseaseData,
      plantData,
      trend,
      total: items.length,
      avgConfidence: items.length ? confidenceSum / items.length : 0,
    };
  }, [items]);
}

export default function StatsCharts({ items }) {
  const { diseaseData, plantData, trend, total, avgConfidence } = useAggregates(items);

  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-soil-light dark:text-cream-200/60">
        Run a few predictions to see your statistics here.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatTile label="Total predictions" value={total} />
        <StatTile label="Average confidence" value={`${avgConfidence.toFixed(1)}%`} />
        <StatTile label="Diseases seen" value={diseaseData.length} />
        <StatTile label="Plants scanned" value={plantData.length} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="font-display font-semibold text-canopy-700 dark:text-cream-100 mb-4">
            Most detected disease
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={diseaseData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {diseaseData.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
              <Legend verticalAlign="bottom" height={48} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-display font-semibold text-canopy-700 dark:text-cream-100 mb-4">
            Most detected plant
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={plantData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#9FD1B6" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
              <Bar dataKey="value" fill="#40916C" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-canopy-700 dark:text-cream-100 mb-4">
            Predictions over time
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#9FD1B6" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
              <Line type="monotone" dataKey="count" stroke="#E8873A" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}

function StatTile({ label, value }) {
  return (
    <GlassCard className="p-5 text-center">
      <p className="font-mono text-2xl font-semibold text-canopy-700 dark:text-cream-100">{value}</p>
      <p className="mt-1 text-xs text-soil-light dark:text-cream-200/60">{label}</p>
    </GlassCard>
  );
}
