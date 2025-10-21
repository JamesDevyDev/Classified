'use client'

import useAdminStore from "@/zustand/useAdminStore";
import useAuthStore from '@/zustand/useAuthStore'

import StudentModal from "@/component/admin-dashboard/studentModal";
import TeacherModal from "@/component/admin-dashboard/teacherModal";

import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
    const { getLoggedInUser, authUser } = useAuthStore()
    const { deleteStudent, deleteTeacher, getStudent, getTeacher, students, teachers } = useAdminStore()

    useEffect(() => {
        getLoggedInUser()
        getTeacher()
        getStudent()
    }, [])


    const [editingStudent, setEditingStudent] = useState<{ id: number; name: string; studentId: string } | null>(null);
    const [editingTeacher, setEditingTeacher] = useState<{ id: number; name: string; department: string } | null>(null);

    const openEditStudentModal = (student: any) => {
        setEditingStudent(student);
        (document.getElementById("edit_student_modal") as HTMLDialogElement).showModal();
    };

    const openEditTeacherModal = (teacher: any) => {
        setEditingTeacher(teacher);
        (document.getElementById("edit_teacher_modal") as HTMLDialogElement).showModal();
    };

    const handleSaveStudent = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Student:", editingStudent);
        (document.getElementById("edit_student_modal") as HTMLDialogElement).close();

        console.log('nag save na ng student')
    };

    const handleSaveTeacher = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Teacher:", editingTeacher);
        (document.getElementById("edit_teacher_modal") as HTMLDialogElement).close();
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col overflow-x-hidden">

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-10 space-y-8">
                {/* Students Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-xl border border-slate-700">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Manage Students</h2>
                    <StudentModal />
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse text-sm md:text-base">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="px-4 py-3 text-slate-300 font-semibold">Student Name</th>
                                    <th className="px-4 py-3 text-slate-300 font-semibold">Student ID</th>
                                    <th className="px-4 py-3 text-slate-300 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student._id} className="hover:bg-slate-700/30 transition border-b border-slate-700/50">
                                        <td className="px-4 py-3 text-slate-200">{student.studentName}</td>
                                        <td className="px-4 py-3 text-slate-200">{student.studentId}</td>
                                        <td className="px-4 py-3 flex flex-col md:flex-row gap-2">
                                            <button
                                                className="bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg hover:bg-cyan-400 transition font-semibold"
                                                onClick={() => openEditStudentModal(student)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                                                onClick={() => {
                                                    deleteStudent(student?._id, authUser?._id)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Teachers Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-xl border border-slate-700">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Manage Teachers</h2>
                    <TeacherModal />
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse text-sm md:text-base">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="px-4 py-3 text-slate-300 font-semibold">Teacher Name</th>
                                    <th className="px-4 py-3 text-slate-300 font-semibold">Department</th>
                                    <th className="px-4 py-3 text-slate-300 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher) => (
                                    <tr key={teacher._id} className="hover:bg-slate-700/30 transition border-b border-slate-700/50">
                                        <td className="px-4 py-3 text-slate-200">{teacher.teacherName}</td>
                                        <td className="px-4 py-3 text-slate-200">{teacher.department}</td>
                                        <td className="px-4 py-3 flex flex-col md:flex-row gap-2">
                                            <button
                                                className="bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg hover:bg-cyan-400 transition font-semibold"
                                                onClick={() => openEditTeacherModal(teacher)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                                                onClick={() => {
                                                    deleteTeacher(teacher?._id, authUser?._id)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* 🧑‍🎓 Edit Student Modal */}
            <dialog id="edit_student_modal" className="modal">
                <div className="modal-box max-w-md bg-slate-800 border border-slate-700">
                    <h3 className="font-bold text-lg mb-4 text-cyan-400">Edit Student</h3>
                    <form onSubmit={handleSaveStudent} className="space-y-4">
                        <div>
                            <label className="block text-slate-300 mb-2 font-medium">Full Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-slate-900/50 border-slate-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                value={editingStudent?.name || ""}
                                onChange={(e) =>
                                    setEditingStudent({ ...editingStudent!, name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 mb-2 font-medium">Student ID</label>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-slate-900/50 border-slate-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                value={editingStudent?.studentId || ""}
                                onChange={(e) =>
                                    setEditingStudent({ ...editingStudent!, studentId: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="btn bg-slate-700 text-slate-300 hover:bg-slate-600 border-none"
                                onClick={() => (document.getElementById("edit_student_modal") as HTMLDialogElement).close()}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn bg-cyan-500 text-slate-900 hover:bg-cyan-400 border-none font-semibold">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/50">
                    <button>Close</button>
                </form>
            </dialog>

            {/* 👩‍🏫 Edit Teacher Modal */}
            <dialog id="edit_teacher_modal" className="modal">
                <div className="modal-box max-w-md bg-slate-800 border border-slate-700">
                    <h3 className="font-bold text-lg mb-4 text-cyan-400">Edit Teacher</h3>
                    <form onSubmit={handleSaveTeacher} className="space-y-4">
                        <div>
                            <label className="block text-slate-300 mb-2 font-medium">Teacher Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-slate-900/50 border-slate-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                value={editingTeacher?.name || ""}
                                onChange={(e) =>
                                    setEditingTeacher({ ...editingTeacher!, name: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 mb-2 font-medium">Department</label>
                            <select
                                className="select select-bordered w-full bg-slate-900/50 border-slate-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                value={editingTeacher?.department || ""}
                                onChange={(e) =>
                                    setEditingTeacher({ ...editingTeacher!, department: e.target.value })
                                }
                                required
                            >
                                <option value="" disabled>Select department</option>
                                <option>Mathematics</option>
                                <option>Science</option>
                                <option>English</option>
                                <option>Information Technology</option>
                                <option>Engineering</option>
                                <option>Business Administration</option>
                                <option>Humanities</option>
                                <option>Education</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="btn bg-slate-700 text-slate-300 hover:bg-slate-600 border-none"
                                onClick={() =>
                                    (document.getElementById("edit_teacher_modal") as HTMLDialogElement).close()
                                }
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn bg-cyan-500 text-slate-900 hover:bg-cyan-400 border-none font-semibold"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop bg-black/50">
                    <button>Close</button>
                </form>
            </dialog>

        </div>
    );
}