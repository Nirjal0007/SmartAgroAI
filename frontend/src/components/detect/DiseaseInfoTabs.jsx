import { useState } from 'react';
import { FiActivity, FiAlertTriangle, FiFeather, FiShieldOff } from 'react-icons/fi';

const TABS = [
  { key: 'symptoms', label: 'Symptoms', icon: FiActivity },
  { key: 'causes', label: 'Causes', icon: FiAlertTriangle },
  { key: 'treatment', label: 'Treatment', icon: FiFeather },
  { key: 'prevention', label: 'Prevention', icon: FiShieldOff },
];

export default function DiseaseInfoTabs({ data }) {
  const [active, setActive] = useState('symptoms');
  const list = data[active] || [];

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-canopy-100 dark:border-canopy-700 pb-1">
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          const count = data[tab.key]?.length || 0;
          if (count === 0) return null;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-canopy-50 dark:bg-canopy-700/60 text-canopy-700 dark:text-cream-100 border-b-2 border-harvest'
                  : 'text-soil-light dark:text-cream-200/60 hover:text-canopy-600'
              }`}
            >
              <tab.icon size={15} /> {tab.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-5 space-y-3">
        {list.length === 0 && (
          <li className="text-sm text-soil-light dark:text-cream-200/60">No information available.</li>
        )}
        {list.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-soil dark:text-cream-200/90 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-harvest" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
