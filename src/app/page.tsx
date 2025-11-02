import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Simple Header */}
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-cyan-400">Clasified</h1>
          <Link
            href='/auth/login'
            className="text-sm text-slate-300 hover:text-cyan-400 transition"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero Section - Centered and Clean */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Class scheduling,
          <br />
          simplified.
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Manage courses, schedules, and students in one clean interface.
        </p>
        <Link
          href='/auth/login'
          className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:from-cyan-400 hover:to-blue-400 transition shadow-lg shadow-cyan-500/30"
        >
          Get started
        </Link>
      </section>

      {/* Simple Feature Grid */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-700">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4 border border-cyan-500/30">
              <Calendar className="text-cyan-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Visual schedules</h3>
            <p className="text-slate-400 text-sm">
              See your entire week at a glance with clear, organized calendar views.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-4 border border-purple-500/30">
              <Clock className="text-purple-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Conflict detection</h3>
            <p className="text-slate-400 text-sm">
              Will detect conflict if they happen.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/20 rounded-lg mb-4 border border-emerald-500/30">
              <Users className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Easy management</h3>
            <p className="text-slate-400 text-sm">
              Add courses, assign teachers, and enroll students effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-sm text-slate-500">
            © 2024 Clasified. A simple tool for class scheduling.
          </p>
        </div>
      </footer>
    </div>
  );
}