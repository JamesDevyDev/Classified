import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-slate-900 shadow-lg">
        <h1 className="text-2xl font-bold text-cyan-400">Classified</h1>
        <div className="space-x-6">
          <a href="#features" className="text-slate-200 hover:text-cyan-400 transition">Features</a>
          <a href="#about" className="text-slate-200 hover:text-cyan-400 transition">About</a>
          <a href="#contact" className="text-slate-200 hover:text-cyan-400 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simplify Your Class Scheduling
          </h2>
          <p className="text-slate-300 text-lg mb-6">
            Organize courses, instructors, and classrooms effortlessly with our smart scheduling system.
            Save time and avoid conflicts.
          </p>
          <Link href='/auth/login' className="bg-cyan-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition shadow-lg hover:shadow-cyan-500/50">
            Start Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-20 py-20 bg-slate-50">
        <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">Features</h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-cyan-500">
            <h4 className="text-xl font-semibold mb-4 text-slate-900">Smart Scheduling</h4>
            <p className="text-slate-600">
              Automatically detect conflicts and optimize your schedule with intelligent algorithms.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-purple-500">
            <h4 className="text-xl font-semibold mb-4 text-slate-900">Resource Management</h4>
            <p className="text-slate-600">
              Keep track of classrooms, labs, and equipment so that everything runs smoothly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-pink-500">
            <h4 className="text-xl font-semibold mb-4 text-slate-900">Easy Enrollment</h4>
            <p className="text-slate-600">
              Let students register, manage waitlists, and receive notifications about classes.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 md:px-20 py-20 bg-gradient-to-br from-cyan-500 to-blue-600">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold mb-6 text-white">Why Choose Classified?</h3>
            <p className="text-cyan-50 text-lg mb-4">
              Our platform is designed to make life easier for administrators, teachers, and students alike.
              With a modern interface and smart features, managing schedules has never been this efficient.
            </p>
            <p className="text-cyan-50 text-lg">
              Focus on teaching and learning, while Classified handles the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="contact" className="py-20 text-center bg-slate-900 text-white">
        <h3 className="text-3xl font-bold mb-6">Ready to Simplify Your Scheduling?</h3>
        <p className="text-slate-300 text-lg mb-8">Start your free trial today and take control of your classes effortlessly.</p>
        <button className="bg-cyan-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition shadow-lg hover:shadow-cyan-500/50">
          Get Started
        </button>
      </section>
    </div>
  );
}