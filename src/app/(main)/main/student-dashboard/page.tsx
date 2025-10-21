import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
    // Sample data for classes
    const upcomingClasses = [
        { id: 1, course: "Math 101", time: "Mon 9:00 AM - 10:30 AM", teacher: "Mr. Smith" },
        { id: 2, course: "Physics 201", time: "Tue 11:00 AM - 12:30 PM", teacher: "Ms. Johnson" },
        { id: 3, course: "Chemistry 101", time: "Wed 2:00 PM - 3:30 PM", teacher: "Dr. Lee" },
    ];

    const enrolledCourses = [
        "Math 101",
        "Physics 201",
        "Chemistry 101",
        "English Literature",
    ];

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">

            {/* Main Content */}
            <div className="flex flex-col md:flex-row flex-1 p-6 md:p-10 gap-6">
                {/* Left Sidebar */}
                <aside className="md:w-1/4 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-slate-700">
                    <h2 className="text-xl font-semibold mb-4 text-white">Enrolled Courses</h2>
                    <ul className="space-y-2">
                        {enrolledCourses.map((course, idx) => (
                            <li
                                key={idx}
                                className="px-3 py-2 bg-slate-700/50 text-slate-200 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-300 cursor-pointer transition border border-slate-600/50"
                            >
                                {course}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Right Main Section */}
                <main className="flex-1">
                    <h2 className="text-2xl font-bold mb-6 text-white">Upcoming Classes</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {upcomingClasses.map((cls) => (
                            <div
                                key={cls.id}
                                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition border border-slate-700"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{cls.course}</h3>
                                <p className="text-slate-300 mb-1">
                                    <span className="font-semibold text-slate-200">Time:</span> {cls.time}
                                </p>
                                <p className="text-slate-300 mb-4">
                                    <span className="font-semibold text-slate-200">Teacher:</span> {cls.teacher}
                                </p>
                                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 font-semibold">
                                    Join Class
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Schedule Overview */}
                    <section className="mt-10 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-slate-700">
                        <h3 className="text-xl font-semibold mb-4 text-white">Weekly Schedule</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Day</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Course</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Time</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingClasses.map((cls) => (
                                        <tr key={cls.id} className="hover:bg-slate-700/30 transition border-b border-slate-700/50">
                                            <td className="px-4 py-3 text-slate-200">{cls.time.split(" ")[0]}</td>
                                            <td className="px-4 py-3 text-cyan-400 font-medium">{cls.course}</td>
                                            <td className="px-4 py-3 text-slate-200">{cls.time.split(" ").slice(1).join(" ")}</td>
                                            <td className="px-4 py-3 text-slate-200">{cls.teacher}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}