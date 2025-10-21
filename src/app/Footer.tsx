import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, BookOpen } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Classified</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering education through innovative learning management solutions.
                            Connect, learn, and grow with us.
                        </p>
                        {/* Social Media */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href="#"
                                className="w-9 h-9 bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-lg flex items-center justify-center transition group"
                            >
                                <Facebook className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-lg flex items-center justify-center transition group"
                            >
                                <Twitter className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-lg flex items-center justify-center transition group"
                            >
                                <Instagram className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-lg flex items-center justify-center transition group"
                            >
                                <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    Courses
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    Teachers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    Students
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    Resources
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm">
                                <div className="w-9 h-9 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-slate-400 leading-relaxed">
                                        123 Education Street<br />
                                        Learning District, ED 12345
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <div className="w-9 h-9 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4 text-cyan-400" />
                                </div>
                                <a href="tel:+1234567890" className="text-slate-400 hover:text-cyan-400 transition">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <div className="w-9 h-9 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-cyan-400" />
                                </div>
                                <a href="mailto:info@Classified.com" className="text-slate-400 hover:text-cyan-400 transition">
                                    info@Classified.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm text-center md:text-left">
                            © {currentYear} Classified. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                                Accessibility
                            </a>
                            <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                                Sitemap
                            </a>
                            <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}