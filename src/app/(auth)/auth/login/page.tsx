'use client'

import React, { useState } from "react";
import Image from "next/image";
import useAuthStore from "@/zustand/useAuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { loginFunction } = useAuthStore();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        const data = await loginFunction({ username, password });

        if (data?.error) {
            setError(data.error);
            return;
        }

        router.push("/main");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Illustration */}
            <div className="hidden md:flex md:w-1/2 bg-indigo-50 justify-center items-center">
                <Image
                    src="/assets/bg1.png"
                    alt="Login Illustration"
                    width={500}
                    height={500}
                />
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-1 justify-center items-center p-8 md:p-16">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Log in to access your class schedule and manage your courses.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                className="block text-gray-700 mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-gray-700 mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <label>
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <a href="#" className="text-indigo-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
