import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <Sparkles className="h-4 w-4" />
              AI-driven market intelligence
            </div>
            <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              InvestAI — Smarter Decisions for the Indian Markets
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              A modern platform delivering deep stock analysis, actionable insights, and a delightful experience. Built to help you navigate the markets with clarity and confidence.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Explore Dashboard
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-5 py-3 text-indigo-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Shield className="h-4 w-4" /> Trusted by investors
              </button>
            </div>
          </motion.div>

          {/* 3D Spline Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative h-[420px] w-full rounded-2xl ring-1 ring-indigo-100/70 lg:h-[520px]"
          >
            <Spline
              scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
            {/* Soft gradient overlays that don't block interaction */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-white/40 via-transparent to-transparent" />
            <div className="pointer-events-none absolute -inset-x-10 -bottom-10 h-32 bg-gradient-to-t from-white" />
          </motion.div>
        </div>
      </div>

      {/* Decorative background blob */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-64 w-[40rem] -translate-x-1/2 bg-gradient-to-br from-indigo-100 via-purple-100 to-transparent blur-3xl" />
    </section>
  );
}
