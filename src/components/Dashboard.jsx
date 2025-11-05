import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, LineChart, TrendingUp } from 'lucide-react';

function MiniLineChart({ points = [], color = '#4f46e5' }) {
  const path = useMemo(() => {
    if (!points.length) return '';
    const width = 220;
    const height = 70;
    const maxY = Math.max(...points);
    const minY = Math.min(...points);
    const range = maxY - minY || 1;
    const stepX = width / (points.length - 1);
    const toY = (v) => height - ((v - minY) / range) * height;
    return points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX},${toY(v)}`).join(' ');
  }, [points]);

  return (
    <svg viewBox="0 0 220 70" className="h-20 w-full">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function StatCard({ title, value, delta, icon: Icon, color = 'indigo' }) {
  const deltaPositive = typeof delta === 'number' ? delta >= 0 : String(delta).includes('+');
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className={`inline-flex items-center justify-center rounded-xl bg-${color}-50 p-2 text-${color}-600`}> 
          <Icon className="h-5 w-5" />
        </div>
        <span className={`text-xs font-medium ${deltaPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {deltaPositive ? '▲' : '▼'} {typeof delta === 'number' ? `${Math.abs(delta)}%` : delta}
        </span>
      </div>
      <div className="mt-3 text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
      <div className="mt-3">
        <MiniLineChart points={[100, 102, 98, 104, 110, 108, 115]} color={color === 'purple' ? '#7c3aed' : '#4f46e5'} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Technical', 'Fundamentals'];

  return (
    <section id="dashboard" className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900">Stock Analysis Dashboard</h2>
            <p className="mt-2 text-gray-600">Key metrics, price action, and AI-driven insights for informed decisions.</p>
          </div>

          <div className="inline-flex items-center rounded-xl bg-indigo-50 p-2 text-indigo-700 ring-1 ring-indigo-100">
            <LineChart className="mr-2 h-5 w-5" /> Live market snapshot
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex w-full items-center gap-2 overflow-x-auto rounded-xl border border-gray-100 bg-gray-50 p-1 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-lg px-4 py-2 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTab === tab ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {activeTab === 'Overview' && (
              <>
                <StatCard title="Nifty 50" value="22,150" delta={0.8} icon={TrendingUp} color="indigo" />
                <StatCard title="Sensex" value="73,250" delta={0.5} icon={Activity} color="purple" />
                <div className="col-span-1 md:col-span-2 lg:col-span-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700">AI Insight</div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-1 text-xs text-purple-700 ring-1 ring-purple-100"><Brain className="h-3.5 w-3.5"/> signal</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    Momentum remains constructive with higher highs forming on major indices. Consider a staggered approach for large-cap entries; mid-caps show selective strength. Keep an eye on banking breadth — a sustained uptick could extend the current leg higher.
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Price Action (Last 7 Days)</h3>
                    <span className="text-xs text-gray-500">Demo data</span>
                  </div>
                  <div className="h-48 w-full rounded-lg bg-gradient-to-b from-indigo-50 to-white p-3">
                    <MiniLineChart points={[120, 129, 126, 134, 141, 139, 148]} color="#6366F1" />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Technical' && (
              <>
                <StatCard title="RSI (14)" value="56.3" delta={+2.1} icon={Activity} color="indigo" />
                <StatCard title="MACD" value="Bullish" delta={'+'} icon={TrendingUp} color="purple" />
                <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 font-medium text-gray-900">Support & Resistance</h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                      { label: 'Support 1', val: '21,980' },
                      { label: 'Support 2', val: '21,750' },
                      { label: 'Resistance 1', val: '22,260' },
                      { label: 'Resistance 2', val: '22,520' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg bg-gray-50 p-4 text-center">
                        <div className="text-xs text-gray-500">{s.label}</div>
                        <div className="mt-1 font-semibold text-gray-900">{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Fundamentals' && (
              <>
                <StatCard title="PE Ratio (Nifty)" value="24.1" delta={-0.3} icon={TrendingUp} color="indigo" />
                <StatCard title="PB Ratio (Nifty)" value="3.6" delta={+0.1} icon={Activity} color="purple" />
                <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 font-medium text-gray-900">Sector Snapshot</h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
                    {[
                      { name: 'IT', score: 72 },
                      { name: 'Banks', score: 65 },
                      { name: 'Auto', score: 58 },
                      { name: 'FMCG', score: 61 },
                      { name: 'Energy', score: 69 },
                      { name: 'Pharma', score: 55 },
                    ].map((s) => (
                      <div key={s.name} className="rounded-lg border border-gray-100 bg-white p-3 text-center shadow-sm">
                        <div className="text-xs text-gray-500">{s.name}</div>
                        <div className="mt-1 font-semibold text-gray-900">{s.score}</div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <div className="h-full rounded-full bg-indigo-500" style={{ width: `${s.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
