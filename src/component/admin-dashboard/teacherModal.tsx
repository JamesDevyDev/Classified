'use client'
import React, { useState, useEffect } from 'react'

import useAuthStore from '@/zustand/useAuthStore'
import useAdminStore from '@/zustand/useAdminStore'

const TeacherModal = () => {
    const { getLoggedInUser, authUser } = useAuthStore()
    const { createTeacher } = useAdminStore()

    useEffect(() => {
        getLoggedInUser()
    }, [])

    const [teacherName, setTeacherName] = useState('')
    const [password, setPassword] = useState('')

    const openModal = () => {
        const modal = document.getElementById('teacher_modal') as HTMLDialogElement | null
        if (modal) modal.showModal()
    }

    const closeModal = () => {
        const modal = document.getElementById('teacher_modal') as HTMLDialogElement | null
        if (modal) modal.close()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createTeacher(teacherName, password, authUser?._id)

        // Reset fields and close modal
        setTeacherName('')
        setPassword('')
        closeModal()
    }

    return (
        <div>
            {/* Button to open modal */}
            <button
                className="btn bg-green-600 text-white hover:bg-green-700"
                onClick={openModal}
            >
                Add Teacher
            </button>

            {/* DaisyUI Modal */}
            <dialog id="teacher_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-4 text-indigo-600">Add New Teacher</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Teacher Name */}
                        <div>
                            <label className="block text-gray-700 mb-1">Teacher Name</label>
                            <input
                                type="text"
                                placeholder="Enter teacher name"
                                className="input input-bordered w-full"
                                value={teacherName}
                                onChange={(e) => setTeacherName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="btn bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* Backdrop */}
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </div>
    )
}

export default TeacherModal
