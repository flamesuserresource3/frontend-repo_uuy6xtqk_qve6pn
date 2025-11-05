import React, { useMemo } from 'react';
import { Globe, Newspaper, RefreshCw } from 'lucide-react';

function useMarketStatusIST() {
  return useMemo(() => {
    const now = new Date();
    const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const day = istTime.getDay(); // 0 Sun ... 6 Sat
    const isWeekday = day >= 1 && day <= 5;

    const open = new Date(istTime); open.setHours(9, 15, 0, 0);
    const close = new Date(istTime); close.setHours(15, 30, 0, 0);

    const isOpen = isWeekday && istTime >= open && istTime <= close;
    return { isOpen, time: istTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
  }, []);
}

export default function NewsAndMarkets() {
  const { isOpen, time } = useMarketStatusIST();

  const news = [
    {
      title: 'IT stocks gain as global risk-on sentiment improves',
      source: 'InvestAI Newsroom',
      time: '12m ago',
    },
    {
      title: 'RBI policy hints at calibrated liquidity; banks steady',
      source: 'Markets Desk',
      time: '1h ago',
    },
    {
      title: 'Auto sector delivers robust sales; valuations still reasonable',
      source: 'Sector Watch',
      time: '2h ago',
    },
  ];

  const forex = [
    { pair: 'USD/INR', value: 83.14, delta: -0.06 },
    { pair: 'EUR/INR', value: 88.72, delta: +0.12 },
    { pair: 'GBP/INR', value: 102.35, delta: +0.04 },
  ];

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900">News & Market Updates</h2>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 ${isOpen ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' : 'bg-rose-50 text-rose-700 ring-rose-100'}`}>
            <Globe className="h-4 w-4" />
            {isOpen ? 'Market Open' : 'Market Closed'} • {time} IST
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* News feed */}
          <div className="md:col-span-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <Newspaper className="h-5 w-5 text-indigo-600" /> Headlines
              </div>
              <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50">
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            </div>
            <ul className="space-y-4">
              {news.map((n, i) => (
                <li key={i} className="group rounded-lg p-3 transition hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <h3 className="max-w-prose font-medium text-gray-900 group-hover:text-indigo-700">{n.title}</h3>
                    <span className="ml-3 whitespace-nowrap text-xs text-gray-500">{n.time}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{n.source}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Forex & announcements */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-3 text-sm font-medium text-gray-700">Forex Rates</div>
              <ul className="space-y-3">
                {forex.map((f) => (
                  <li key={f.pair} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <span className="text-sm text-gray-700">{f.pair}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">{f.value.toFixed(2)}</span>
                      <span className={`rounded-md px-2 py-0.5 text-xs ${f.delta >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {f.delta >= 0 ? '+' : ''}{f.delta.toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-3 text-sm font-medium text-gray-700">Announcements</div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="rounded-lg bg-indigo-50 p-3 text-indigo-800 ring-1 ring-indigo-100">New: AI-augmented screening now available for Nifty 500</li>
                <li className="rounded-lg bg-purple-50 p-3 text-purple-800 ring-1 ring-purple-100">Update: Portfolio risk heatmap adds factor exposures</li>
                <li className="rounded-lg bg-gray-50 p-3 text-gray-700 ring-1 ring-gray-100">Notice: Scheduled maintenance this Saturday 10 PM IST</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
