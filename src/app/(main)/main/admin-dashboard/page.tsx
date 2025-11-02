'use client'

import useAdminStore from "@/zustand/useAdminStore";
import useAuthStore from '@/zustand/useAuthStore'

import StudentModal from "@/component/admin-dashboard/studentModal";
import TeacherModal from "@/component/admin-dashboard/teacherModal";

import React, { useEffect, useState } from "react";
import { Users, GraduationCap, Edit2, Trash2, Plus, Loader2, X } from "lucide-react";

export default function AdminDashboard() {
    const { getLoggedInUser, authUser } = useAuthStore()
    const { deleteStudent, deleteTeacher, getStudent, getTeacher, students, teachers } = useAdminStore()
    const [isLoading, setIsLoading] = useState(true);
    const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);
    const [deletingTeacherId, setDeletingTeacherId] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await getLoggedInUser();
            await getTeacher();
            await getStudent();
            setIsLoading(false);
        })();
    }, []);

    const [editingStudent, setEditingStudent] = useState<{ id: number; name: string; studentId: string } | null>(null);
    const [editingTeacher, setEditingTeacher] = useState<{ id: number; name: string } | null>(null);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [showTeacherModal, setShowTeacherModal] = useState(false);

    const openEditStudentModal = (student: any) => {
        setEditingStudent(student);
        setShowStudentModal(true);
    };

    const openEditTeacherModal = (teacher: any) => {
        setEditingTeacher(teacher);
        setShowTeacherModal(true);
    };

    const handleSaveStudent = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Student:", editingStudent);
        setShowStudentModal(false);

        console.log('nag save na ng student')
    };

    const handleSaveTeacher = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Teacher:", editingTeacher);
        setShowTeacherModal(false);
    };

    const handleDeleteStudent = async (studentId: string) => {
        if (!confirm('Are you sure you want to delete this student?')) return;

        setDeletingStudentId(studentId);
        try {
            await deleteStudent(studentId);
            // Optionally refresh the list
            await getStudent();
        } catch (error) {
            console.error('Failed to delete student:', error);
        } finally {
            setDeletingStudentId(null);
        }
    };

    const handleDeleteTeacher = async (teacherId: string) => {
        if (!confirm('Are you sure you want to delete this teacher?')) return;

        setDeletingTeacherId(teacherId);
        try {
            await deleteTeacher(teacherId);
            // Optionally refresh the list
            await getTeacher();
        } catch (error) {
            console.error('Failed to delete teacher:', error);
        } finally {
            setDeletingTeacherId(null);
        }
    };

    // Skeleton Loading Component
    const TableSkeleton = () => (
        <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                    <div className="skeleton h-12 w-full bg-slate-700/50"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Total Students</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {isLoading ? <span className="skeleton h-8 w-16 bg-slate-700/50 inline-block"></span> : students.length}
                                </p>
                            </div>
                            <div className="bg-cyan-500/20 p-3 rounded-lg">
                                <Users className="text-cyan-400" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Total Teachers</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {isLoading ? <span className="skeleton h-8 w-16 bg-slate-700/50 inline-block"></span> : teachers.length}
                                </p>
                            </div>
                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                <GraduationCap className="text-purple-400" size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
                    <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Users className="text-cyan-400" size={24} />
                            <h2 className="text-xl md:text-2xl font-bold text-white">Students</h2>
                        </div>
                        <StudentModal />
                    </div>

                    <div className="p-6">
                        {isLoading ? (
                            <TableSkeleton />
                        ) : students.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="mx-auto text-slate-600 mb-4" size={48} />
                                <p className="text-slate-400 text-lg">No students yet</p>
                                <p className="text-slate-500 text-sm mt-2">Click "Add Student" to get started</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm md:text-base">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="px-4 py-3 text-slate-300 font-semibold">Student Name</th>
                                            <th className="px-4 py-3 text-slate-300 font-semibold">Student ID</th>
                                            <th className="px-4 py-3 text-slate-300 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr
                                                key={student._id}
                                                className={`hover:bg-slate-700/30 transition-all duration-300 border-b border-slate-700/50 ${deletingStudentId === student._id ? 'opacity-50 pointer-events-none' : ''
                                                    }`}
                                            >
                                                <td className="px-4 py-4 text-slate-200 font-medium">{student.studentName}</td>
                                                <td className="px-4 py-4 text-slate-400">{student.studentId}</td>
                                                <td className="px-4 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            className="btn btn-sm bg-slate-700 text-slate-300 hover:bg-slate-600 border-none"
                                                            onClick={() => openEditStudentModal(student)}
                                                            disabled={deletingStudentId === student._id}
                                                        >
                                                            <Edit2 size={16} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 border-none"
                                                            onClick={() => handleDeleteStudent(student?._id)}
                                                            disabled={deletingStudentId === student._id}
                                                        >
                                                            {deletingStudentId === student._id ? (
                                                                <Loader2 size={16} className="animate-spin" />
                                                            ) : (
                                                                <Trash2 size={16} />
                                                            )}
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>

                {/* Teachers Section */}
                <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
                    <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <GraduationCap className="text-purple-400" size={24} />
                            <h2 className="text-xl md:text-2xl font-bold text-white">Teachers</h2>
                        </div>
                        <TeacherModal />
                    </div>

                    <div className="p-6">
                        {isLoading ? (
                            <TableSkeleton />
                        ) : teachers.length === 0 ? (
                            <div className="text-center py-12">
                                <GraduationCap className="mx-auto text-slate-600 mb-4" size={48} />
                                <p className="text-slate-400 text-lg">No teachers yet</p>
                                <p className="text-slate-500 text-sm mt-2">Click "Add Teacher" to get started</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm md:text-base">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="px-4 py-3 text-slate-300 font-semibold">Teacher Name</th>
                                            <th className="px-4 py-3 text-slate-300 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teachers.map((teacher) => (
                                            <tr
                                                key={teacher._id}
                                                className={`hover:bg-slate-700/30 transition-all duration-300 border-b border-slate-700/50 ${deletingTeacherId === teacher._id ? 'opacity-50 pointer-events-none' : ''
                                                    }`}
                                            >
                                                <td className="px-4 py-4 text-slate-200 font-medium">{teacher.teacherName}</td>
                                                <td className="px-4 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            className="btn btn-sm bg-slate-700 text-slate-300 hover:bg-slate-600 border-none"
                                                            onClick={() => openEditTeacherModal(teacher)}
                                                            disabled={deletingTeacherId === teacher._id}
                                                        >
                                                            <Edit2 size={16} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 border-none"
                                                            onClick={() => handleDeleteTeacher(teacher?._id)}
                                                            disabled={deletingTeacherId === teacher._id}
                                                        >
                                                            {deletingTeacherId === teacher._id ? (
                                                                <Loader2 size={16} className="animate-spin" />
                                                            ) : (
                                                                <Trash2 size={16} />
                                                            )}
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* 🧑‍🎓 Edit Student Modal */}
            {showStudentModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-xl text-cyan-400 flex items-center gap-2">
                                <Edit2 size={20} />
                                Edit Student
                            </h3>
                            <button
                                onClick={() => setShowStudentModal(false)}
                                className="text-slate-400 hover:text-white transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveStudent} className="space-y-5">
                            <div>
                                <label className="block text-slate-300 mb-2 font-medium text-sm">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                    value={editingStudent?.name || ""}
                                    onChange={(e) =>
                                        setEditingStudent({ ...editingStudent!, name: e.target.value })
                                    }
                                    placeholder="Enter student name"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-2 font-medium text-sm">Student ID</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                    value={editingStudent?.studentId || ""}
                                    onChange={(e) =>
                                        setEditingStudent({ ...editingStudent!, studentId: e.target.value })
                                    }
                                    placeholder="Enter student ID"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    className="px-6 py-2.5 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition font-medium"
                                    onClick={() => setShowStudentModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-lg shadow-cyan-500/30"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 👩‍🏫 Edit Teacher Modal */}
            {showTeacherModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-xl text-purple-400 flex items-center gap-2">
                                <Edit2 size={20} />
                                Edit Teacher
                            </h3>
                            <button
                                onClick={() => setShowTeacherModal(false)}
                                className="text-slate-400 hover:text-white transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveTeacher} className="space-y-5">
                            <div>
                                <label className="block text-slate-300 mb-2 font-medium text-sm">Teacher Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    value={editingTeacher?.name || ""}
                                    onChange={(e) =>
                                        setEditingTeacher({ ...editingTeacher!, name: e.target.value })
                                    }
                                    placeholder="Enter teacher name"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    className="px-6 py-2.5 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition font-medium"
                                    onClick={() => setShowTeacherModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-400 hover:to-pink-400 transition font-semibold shadow-lg shadow-purple-500/30"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}