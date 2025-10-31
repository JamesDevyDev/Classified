'use client'
import React, { useEffect, useRef, useState } from 'react'

import useAuthStore from '@/zustand/useAuthStore'
import useAdminStore from '@/zustand/useAdminStore'

const StudentModal: React.FC = () => {

    const { getLoggedInUser, authUser } = useAuthStore()
    const { createStudent } = useAdminStore()

    useEffect(() => {
        getLoggedInUser()
    }, [])

    const modalRef = useRef<HTMLDialogElement>(null)
    const [studentName, setStudentName] = useState('')
    const [studentId, setStudentId] = useState('')
    const [password, setPassword] = useState('')

    const openModal = () => modalRef.current?.showModal()
    const closeModal = () => modalRef.current?.close()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createStudent(studentName, password)

        // Reset and close modal
        setStudentName('')
        setStudentId('')
        setPassword('')
        closeModal()
    }

    return (
        <div>
            {/* Button to open modal */}
            <button className="btn bg-blue-600 text-white hover:bg-blue-700" onClick={openModal}>
                Add Student
            </button>

            {/* DaisyUI Modal */}
            <dialog ref={modalRef} id="student_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-4 text-indigo-600">Add New Student</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Student Name */}
                        <div>
                            <label className="block text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter student name"
                                className="input input-bordered w-full"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
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

export default StudentModal
