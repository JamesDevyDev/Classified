'use client'

import React, { useEffect } from 'react'
import useAuthStore from '@/zustand/useAuthStore'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()

    const { getLoggedInUser, authUser, logoutFunction } = useAuthStore()

    useEffect(() => {
        getLoggedInUser()
    }, [])

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-slate-900 shadow-lg gap-4 border-b border-slate-700">
            <h1 className="text-2xl font-bold text-cyan-400">
                Classified <span className="text-slate-300 font-normal text-lg">{authUser?.role}</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center">
                <a href="/admin-dashboard" className="text-slate-300 hover:text-cyan-400 transition font-medium">
                    Dashboard
                </a>
                <a href="/profile" className="text-slate-300 hover:text-cyan-400 transition font-medium">
                    Profile
                </a>
                <button
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-400 cursor-pointer transition shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 font-semibold"
                    onClick={() => {
                        logoutFunction()
                        setTimeout(() => {
                            router.push('/')
                        }, 1000)
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar