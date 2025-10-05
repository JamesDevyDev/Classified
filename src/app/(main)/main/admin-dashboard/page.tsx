'use client'

import StudentModal from "@/component/admin-dashboard/studentModal";
import TeacherModal from "@/component/admin-dashboard/teacherModal";
import React, { useState } from "react";

export default function AdminDashboard() {
    const [students, setStudents] = useState([
        { id: 1, name: "John Doe", studentId: "S-001" },
        { id: 2, name: "Mark Lee", studentId: "S-002" },
    ]);

    const [teachers, setTeachers] = useState([
        { id: 1, name: "Jane Smith", department: "Mathematics" },
        { id: 2, name: "Alex Johnson", department: "Science" },
    ]);

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
    };

    const handleSaveTeacher = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Teacher:", editingTeacher);
        (document.getElementById("edit_teacher_modal") as HTMLDialogElement).close();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
            {/* Navbar */}
            <nav className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-white shadow-md gap-4">
                <h1 className="text-2xl font-bold text-indigo-600">
                    Classified <span className="text-black">Admin</span>
                </h1>
                <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                    <a href="/admin-dashboard" className="text-gray-700 hover:text-indigo-600">
                        Dashboard
                    </a>
                    <a href="/profile" className="text-gray-700 hover:text-indigo-600">
                        Profile
                    </a>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-10 space-y-8">
                {/* Students Section */}
                <section className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Manage Students</h2>
                    <StudentModal />
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse text-sm md:text-base">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Student Name</th>
                                    <th className="px-4 py-2 border-b">Student ID</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-indigo-50">
                                        <td className="px-4 py-2 border-b">{student.name}</td>
                                        <td className="px-4 py-2 border-b">{student.studentId}</td>
                                        <td className="px-4 py-2 border-b flex flex-col md:flex-row gap-2">
                                            <button
                                                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                                                onClick={() => openEditStudentModal(student)}
                                            >
                                                Edit
                                            </button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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
                <section className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Manage Teachers</h2>
                    <TeacherModal />
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse text-sm md:text-base">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Teacher Name</th>
                                    <th className="px-4 py-2 border-b">Department</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-indigo-50">
                                        <td className="px-4 py-2 border-b">{teacher.name}</td>
                                        <td className="px-4 py-2 border-b">{teacher.department}</td>
                                        <td className="px-4 py-2 border-b flex flex-col md:flex-row gap-2">
                                            <button
                                                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                                                onClick={() => openEditTeacherModal(teacher)}
                                            >
                                                Edit
                                            </button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-4 text-indigo-600">Edit Student</h3>
                    <form onSubmit={handleSaveStudent} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={editingStudent?.name || ""}
                                onChange={(e) =>
                                    setEditingStudent({ ...editingStudent!, name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Student ID</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={editingStudent?.studentId || ""}
                                onChange={(e) =>
                                    setEditingStudent({ ...editingStudent!, studentId: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" className="btn" onClick={() => (document.getElementById("edit_student_modal") as HTMLDialogElement).close()}>
                                Cancel
                            </button>
                            <button type="submit" className="btn bg-indigo-600 text-white hover:bg-indigo-700">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>

            {/* 👩‍🏫 Edit Teacher Modal */}
            <dialog id="edit_teacher_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-4 text-indigo-600">Edit Teacher</h3>
                    <form onSubmit={handleSaveTeacher} className="space-y-4">
                        {/* Teacher Name */}
                        <div>
                            <label className="block text-gray-700 mb-1">Teacher Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={editingTeacher?.name || ""}
                                onChange={(e) =>
                                    setEditingTeacher({ ...editingTeacher!, name: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* Department Dropdown */}
                        <div>
                            <label className="block text-gray-700 mb-1">Department</label>
                            <select
                                className="select select-bordered w-full"
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

                        {/* Buttons */}
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="btn bg-gray-300 hover:bg-gray-400"
                                onClick={() =>
                                    (document.getElementById("edit_teacher_modal") as HTMLDialogElement).close()
                                }
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
    );
}
