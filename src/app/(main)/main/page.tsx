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
                console.log(user)

                if (user?.role === 'admin') router.push("/main/admin-dashboard")
                else if (user?.role === 'student') router.push("/main/student-dashboard")
                else if (user?.role === 'teacher') router.push("/main/teacher-dashboard")
                else setLoading(false) // unknown role or not redirected
            } catch (error) {
                console.error("Error fetching user:", error)
                setLoading(false)
            }
        }

        upTime()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    return (
        <div className="text-center mt-10">
            Unable to determine role or not logged in.
        </div>
    )
}

export default Main
