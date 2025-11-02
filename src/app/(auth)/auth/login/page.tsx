'use client'

import React, { useState, useEffect } from "react";
import useAuthStore from "@/zustand/useAuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { loginFunction, getLoggedInUser } = useAuthStore();

    useEffect(() => {
        const getUser = async () => {
            const user = await getLoggedInUser()

            if (user) router.push('/main')
        }

        getUser()
    }, [])

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
        <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-cyan-400 mb-2">Clasified</h1>
                    <p className="text-slate-400 text-sm">Sign in to your account</p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg border border-slate-700">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label
                                className="block text-slate-300 font-medium mb-2 text-sm"
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
                                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-500 transition"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-slate-300 font-medium mb-2 text-sm"
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
                                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-500 transition"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center cursor-pointer text-slate-400 hover:text-slate-300 transition">
                                <input type="checkbox" className="mr-2 w-4 h-4 rounded bg-slate-900/50 border-slate-600 text-cyan-500 focus:ring-cyan-500" />
                                Remember me
                            </label>
                            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2.5 rounded-lg font-medium hover:from-cyan-400 hover:to-blue-400 transition shadow-lg shadow-cyan-500/30"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-400">
                        Don't have an account? <a href="#" className="text-cyan-400 hover:text-cyan-300 transition font-medium">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );
}