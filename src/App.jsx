import React from 'react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ComparisonTool from './components/ComparisonTool';
import NewsAndMarkets from './components/NewsAndMarkets';
import { Rocket } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Top nav */}
      <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-sm">
                <Rocket className="h-5 w-5" />
              </div>
              <span className="text-lg font-serif font-semibold tracking-tight">InvestAI</span>
            </a>
            <nav className="hidden gap-6 text-sm text-gray-700 sm:flex">
              <a className="hover:text-indigo-700" href="#dashboard">Dashboard</a>
              <a className="hover:text-indigo-700" href="#compare">Compare</a>
              <a className="hover:text-indigo-700" href="#updates">Updates</a>
            </nav>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50">Sign in</button>
              <button className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">Get started</button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Dashboard />
        <div id="compare"><ComparisonTool /></div>
        <div id="updates"><NewsAndMarkets /></div>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} InvestAI. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-indigo-700">Privacy</a>
              <a href="#" className="hover:text-indigo-700">Terms</a>
              <a href="#" className="hover:text-indigo-700">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
