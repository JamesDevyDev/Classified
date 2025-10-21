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
        <nav className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-white shadow-md gap-4 ">
            <h1 className="text-2xl font-bold text-indigo-600">
                Classified <span className="text-black">{authUser?.role}</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                <a href="/admin-dashboard" className="text-gray-700 hover:text-indigo-600">
                    Dashboard
                </a>
                <a href="/profile" className="text-gray-700 hover:text-indigo-600">
                    Profile
                </a>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700" onClick={() => {
                    logoutFunction()
                    setTimeout(() => {
                        router.push('/')
                    }, 1000)
                }}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar