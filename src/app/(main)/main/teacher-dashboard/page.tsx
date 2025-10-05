import React from "react";
import Link from "next/link";

export default function TeacherDashboard() {
    // Sample data
    const classesTaught = [
        { id: 1, course: "Math 101", time: "Mon 9:00 AM - 10:30 AM", students: 25 },
        { id: 2, course: "Physics 201", time: "Tue 11:00 AM - 12:30 PM", students: 30 },
        { id: 3, course: "Chemistry 101", time: "Wed 2:00 PM - 3:30 PM", students: 20 },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-indigo-600">Classified <span className='text-black'>Teacher</span></h1>
                <div className="space-x-6">
                    <Link href="/teacher-dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
                    <Link href="/profile" className="text-gray-700 hover:text-indigo-600">Profile</Link>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row flex-1 p-6 md:p-10 gap-6">
                {/* Sidebar */}
                <aside className="md:w-1/4 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">My Classes</h2>
                    <ul className="space-y-2 text-gray-700">
                        {classesTaught.map((cls) => (
                            <li
                                key={cls.id}
                                className="px-3 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer"
                            >
                                {cls.course}
                            </li>
                        ))}
                    </ul>
                    <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                        Add New Class
                    </button>
                </aside>

                {/* Main Section */}
                <main className="flex-1">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Class Overview</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {classesTaught.map((cls) => (
                            <div key={cls.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{cls.course}</h3>
                                <p className="text-gray-600 mb-1"><span className="font-semibold">Time:</span> {cls.time}</p>
                                <p className="text-gray-600 mb-3"><span className="font-semibold">Students:</span> {cls.students}</p>
                                <div className="flex space-x-3">
                                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                                        View Students
                                    </button>
                                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                                        Edit Class
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Weekly Schedule */}
                    <section className="mt-10 bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Weekly Schedule</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b">Day</th>
                                        <th className="px-4 py-2 border-b">Course</th>
                                        <th className="px-4 py-2 border-b">Time</th>
                                        <th className="px-4 py-2 border-b">Students</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classesTaught.map((cls) => (
                                        <tr key={cls.id} className="hover:bg-indigo-50">
                                            <td className="px-4 py-2 border-b">{cls.time.split(" ")[0]}</td>
                                            <td className="px-4 py-2 border-b">{cls.course}</td>
                                            <td className="px-4 py-2 border-b">{cls.time.split(" ").slice(1).join(" ")}</td>
                                            <td className="px-4 py-2 border-b">{cls.students}</td>
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
