'use client'

import React, { useEffect, useState } from 'react'
import useAuthStore from '@/zustand/useAuthStore'
import { useRouter } from 'next/navigation'

const Main = () => {

    const router = useRouter()
    const { getLoggedInUser } = useAuthStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const upTime = async () => {
            try {
                const user = await getLoggedInUser()

                // Simulate routing delay
                setTimeout(() => {
                    if (user?.role === 'admin') router.push("/main/admin-dashboard")
                    else if (user?.role === 'student') router.push("/main/student-dashboard")
                    else if (user?.role === 'teacher') router.push("/main/teacher-dashboard")
                    else setLoading(false)
                }, 2000)
            } catch (error) {
                console.error("Error fetching user:", error)
                setLoading(false)
            }
        }

        upTime()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="text-center">
                    {/* Animated Spinner */}
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                    </div>

                    {/* Loading Text */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white">Loading Dashboard</h2>
                        <p className="text-slate-400 text-sm">Please wait while we verify your credentials...</p>
                    </div>

                    {/* Animated Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 max-w-md mx-4 shadow-xl text-center">
                <div className="mb-4">
                    <svg
                        className="w-16 h-16 mx-auto text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Access Error</h2>
                <p className="text-slate-300 mb-6">
                    Unable to determine your role or you are not logged in.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-lg shadow-cyan-500/30"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => console.log('Navigate to login')}
                        className="px-6 py-2 bg-slate-700/70 text-slate-200 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Main