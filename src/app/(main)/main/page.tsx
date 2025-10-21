'use client'

import React, { useEffect } from 'react'
import useAuthStore from '@/zustand/useAuthStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const Main = () => {
    const router = useRouter()
    const { authUser, getLoggedInUser } = useAuthStore()

    const [role, setRole] = useState('')

    // useEffect(() => {
    //     { authUser?.role === 'admin' && router.push("/main/admin-dashboard") }
    //     { authUser?.role === 'student' && router.push("/main/student-dashboard") }
    //     { authUser?.role === 'teacher' && router.push("/main/teacher-dashboard") }
    // }, [])

    useEffect(() => {
        const upTime = async () => {
            const user = await getLoggedInUser()
            console.log(user)

            { user?.role === 'admin' && router.push("/main/admin-dashboard") }
            { user?.role === 'student' && router.push("/main/student-dashboard") }
            { user?.role === 'teacher' && router.push("/main/teacher-dashboard") }
        }

        upTime()
    }, [])

    return (
        <div>
            Hello you are logged in as {role}
        </div>
    )
}

export default Main
