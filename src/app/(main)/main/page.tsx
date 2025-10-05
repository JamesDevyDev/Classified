'use client'

import React, { useEffect } from 'react'
import useAuthStore from '@/zustand/useAuthStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const Main = () => {
    const router = useRouter()
    const { authUser } = useAuthStore()

    const [role, setRole] = useState('')

    useEffect(() => {
        { authUser?.role === 'admin' && router.push("/main/admin-dashboard") }
        { authUser?.role === 'student' && router.push("/main/student-dashboard") }
        { authUser?.role === 'teacher' && router.push("/main/teacher-dashboard") }
    }, [])

    return (
        <div>
            Hello you are logged in as {role}
        </div>
    )
}

export default Main
