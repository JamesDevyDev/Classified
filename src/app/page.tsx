import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">Classified</h1>
        <div className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a>
          <a href="#about" className="text-gray-700 hover:text-indigo-600">About</a>
          <a href="#contact" className="text-gray-700 hover:text-indigo-600">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-indigo-50">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Simplify Your Class Scheduling
          </h2>
          <p className="text-gray-600 mb-6">
            Organize courses, instructors, and classrooms effortlessly with our smart scheduling system.
            Save time and avoid conflicts.
          </p>
          <Link href='/auth/login' className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
            Start Now
          </Link>
        </div>

      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-20 py-20 bg-white ">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Smart Scheduling</h4>
            <p className="text-gray-600">
              Automatically detect conflicts and optimize your schedule with intelligent algorithms.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Resource Management</h4>
            <p className="text-gray-600">
              Keep track of classrooms, labs, and equipment so that everything runs smoothly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Easy Enrollment</h4>
            <p className="text-gray-600">
              Let students register, manage waitlists, and receive notifications about classes.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 md:px-20 py-20 bg-indigo-50">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Classified?</h3>
            <p className="text-gray-600 mb-4">
              Our platform is designed to make life easier for administrators, teachers, and students alike.
              With a modern interface and smart features, managing schedules has never been this efficient.
            </p>
            <p className="text-gray-600">
              Focus on teaching and learning, while Classified handles the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="contact" className="py-20 text-center bg-indigo-600 text-white">
        <h3 className="text-3xl font-bold mb-6">Ready to Simplify Your Scheduling?</h3>
        <p className="mb-8">Start your free trial today and take control of your classes effortlessly.</p>
        <Link href='/auth/login' className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 text-center">
        &copy; {new Date().getFullYear()} Classified. All rights reserved.
      </footer>
    </div>
  );
}
