import React from "react";
import Image from "next/image";

export default function ProfilePage() {
    // Mocked user data
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Student", // Change to "Teacher" to test teacher view
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-indigo-600">ClassScheduler</h1>
                <div className="space-x-6">
                    <a href="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</a>
                    <a href="/profile" className="text-gray-700 hover:text-indigo-600">Profile</a>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row flex-1 p-6 md:p-10 gap-6">
                {/* Left Side - Profile Info */}
                <aside className="md:w-1/4 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                    <Image
                        src="/profile-avatar.png" // Replace with avatar image if available
                        alt="Profile Avatar"
                        width={120}
                        height={120}
                        className="rounded-full"
                    />
                    <h2 className="mt-4 text-xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-gray-500">{user.role}</p>
                    <p className="text-gray-500 mt-2">{user.email}</p>
                </aside>

                {/* Right Side - Editable Form */}
                <main className="flex-1 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Settings</h2>
                    <form className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                defaultValue={user.name}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                defaultValue={user.email}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="role">
                                Role
                            </label>
                            <input
                                type="text"
                                id="role"
                                defaultValue={user.role}
                                disabled
                                className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="password">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter new password"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Save Changes
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}
