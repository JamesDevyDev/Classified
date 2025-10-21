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
        <div className="min-h-screen bg-gray-100 flex flex-col">
            

            {/* Main Content */}
            <div className="flex flex-col md:flex-row flex-1 p-6 md:p-10 gap-6">
                {/* Left Sidebar */}
                <aside className="md:w-1/4 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
                    <ul className="space-y-2 text-gray-700">
                        {enrolledCourses.map((course, idx) => (
                            <li key={idx} className="px-3 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer">
                                {course}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Right Main Section */}
                <main className="flex-1">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Upcoming Classes</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {upcomingClasses.map((cls) => (
                            <div key={cls.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{cls.course}</h3>
                                <p className="text-gray-600 mb-1"><span className="font-semibold">Time:</span> {cls.time}</p>
                                <p className="text-gray-600 mb-3"><span className="font-semibold">Teacher:</span> {cls.teacher}</p>
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                                    Join Class
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Schedule Overview */}
                    <section className="mt-10 bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Weekly Schedule</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b">Day</th>
                                        <th className="px-4 py-2 border-b">Course</th>
                                        <th className="px-4 py-2 border-b">Time</th>
                                        <th className="px-4 py-2 border-b">Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingClasses.map((cls) => (
                                        <tr key={cls.id} className="hover:bg-indigo-50">
                                            <td className="px-4 py-2 border-b">{cls.time.split(" ")[0]}</td>
                                            <td className="px-4 py-2 border-b">{cls.course}</td>
                                            <td className="px-4 py-2 border-b">{cls.time.split(" ").slice(1).join(" ")}</td>
                                            <td className="px-4 py-2 border-b">{cls.teacher}</td>
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
