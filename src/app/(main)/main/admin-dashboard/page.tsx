import React from "react";

export default function AdminDashboard() {
    // Mock data
    const users = [
        { id: 1, name: "John Doe", role: "Student", email: "john@example.com" },
        { id: 2, name: "Jane Smith", role: "Teacher", email: "jane@example.com" },
        { id: 3, name: "Mark Lee", role: "Student", email: "mark@example.com" },
    ];

    const courses = [
        { id: 1, name: "Math 101", teacher: "Jane Smith" },
        { id: 2, name: "Physics 201", teacher: "Alex Johnson" },
    ];

    const classes = [
        { id: 1, course: "Math 101", time: "Mon 9:00 AM - 10:30 AM", room: "Room A" },
        { id: 2, course: "Physics 201", time: "Tue 11:00 AM - 12:30 PM", room: "Room B" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <nav className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-white shadow-md gap-4">
                <h1 className="text-2xl font-bold text-indigo-600">Classified <span className='text-black'>Admin</span></h1>
                <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                    <a href="/admin-dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</a>
                    <a href="/profile" className="text-gray-700 hover:text-indigo-600">Profile</a>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-10 space-y-8">
                {/* Users Section */}
                <section className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Manage Users</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse text-sm md:text-base">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Role</th>
                                    <th className="px-4 py-2 border-b">Email</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-indigo-50">
                                        <td className="px-4 py-2 border-b">{user.name}</td>
                                        <td className="px-4 py-2 border-b">{user.role}</td>
                                        <td className="px-4 py-2 border-b">{user.email}</td>
                                        <td className="px-4 py-2 border-b flex flex-col md:flex-row gap-2">
                                            <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                                                Edit
                                            </button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="mt-4 w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Add User
                    </button>
                </section>

                {/* Courses Section */}
                <section className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Manage Courses</h2>
                    <ul className="space-y-3">
                        {courses.map((course) => (
                            <li
                                key={course.id}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-indigo-50 rounded-lg"
                            >
                                <div className="mb-2 md:mb-0">
                                    <p className="font-semibold text-gray-800">{course.name}</p>
                                    <p className="text-gray-600 text-sm">Teacher: {course.teacher}</p>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Edit</button>
                                    <button className="flex-1 md:flex-none bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-4 w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Add Course
                    </button>
                </section>

                {/* Classes Section */}
                <section className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Manage Classes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {classes.map((cls) => (
                            <div key={cls.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
                                <h3 className="text-lg font-semibold">{cls.course}</h3>
                                <p className="text-gray-600">Time: {cls.time}</p>
                                <p className="text-gray-600">Room: {cls.room}</p>
                                <div className="mt-3 flex flex-col md:flex-row gap-2">
                                    <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Add Class
                    </button>
                </section>
            </div>
        </div>
    );
}
