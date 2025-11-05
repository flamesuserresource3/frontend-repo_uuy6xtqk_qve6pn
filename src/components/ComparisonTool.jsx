import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, BarChart2, Info, Search } from 'lucide-react';

const STOCKS = {
  RELIANCE: { price: 2905, pe: 25.1, volume: 7.2, sector: 'Energy' },
  TCS: { price: 3840, pe: 30.5, volume: 3.8, sector: 'IT' },
  INFY: { price: 1460, pe: 27.8, volume: 5.1, sector: 'IT' },
  HDFCBANK: { price: 1485, pe: 18.2, volume: 8.9, sector: 'Banking' },
};

function getStock(ticker) {
  const key = ticker.toUpperCase().replace(/\s/g, '');
  return STOCKS[key] || { price: 1000, pe: 20.0, volume: 1.5, sector: '—' };
}

function Metric({ label, a, b, formatter = (v) => v, highlight = false }) {
  const better = a > b ? 'A' : a < b ? 'B' : 'eq';
  return (
    <div className={`rounded-lg border ${highlight ? 'border-indigo-200 bg-indigo-50' : 'border-gray-100 bg-white'} p-4`}>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-2 grid grid-cols-2 items-end gap-3 text-sm">
        <div>
          <div className="text-gray-900">{formatter(a)}</div>
          <div className="mt-0.5 text-[11px] text-gray-500">A</div>
        </div>
        <div className="text-right">
          <div className="text-gray-900">{formatter(b)}</div>
          <div className="mt-0.5 text-[11px] text-gray-500">B</div>
        </div>
      </div>
      {better !== 'eq' && (
        <div className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-[11px] ${better === 'A' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {better === 'A' ? 'A leads' : 'B leads'}
        </div>
      )}
    </div>
  );
}

export default function ComparisonTool() {
  const [a, setA] = useState('RELIANCE');
  const [b, setB] = useState('TCS');
  const A = useMemo(() => getStock(a), [a]);
  const B = useMemo(() => getStock(b), [b]);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900">Interactive Comparison</h2>
            <p className="mt-2 text-gray-600">Compare Indian stocks side by side with reusable cards and metrics.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-purple-50 p-2 text-purple-700 ring-1 ring-purple-100">
            <BarChart2 className="h-5 w-5" />
            <span className="text-sm">Indigo/Purple Theme</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-5">
              <label className="mb-1 block text-xs font-medium text-gray-700">Stock A</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., RELIANCE, TCS, INFY"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex items-end justify-center">
              <div className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-2 text-gray-600 ring-1 ring-gray-100">
                <ArrowLeftRight className="h-5 w-5" />
              </div>
            </div>
            <div className="md:col-span-5">
              <label className="mb-1 block text-xs font-medium text-gray-700">Stock B</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., HDFCBANK, INFY"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Metric label="Price (INR)" a={A.price} b={B.price} formatter={(v) => `₹${v.toLocaleString()}`} highlight />
            <Metric label="P/E" a={A.pe} b={B.pe} formatter={(v) => v.toFixed(1)} />
            <Metric label="Volume (Mn)" a={A.volume} b={B.volume} formatter={(v) => v.toFixed(1)} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${a}-${b}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-6 rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-white p-4"
            >
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <Info className="mt-0.5 h-4 w-4 text-indigo-600" />
                <p>
                  This tool is for demonstration and UI exploration. Data shown here is sample market data. Connect your data source or our APIs to power real-time insights.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
