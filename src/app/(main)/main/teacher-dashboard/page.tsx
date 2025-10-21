'use client'

import React, { useState } from "react";
import { Trash2, Edit, Plus, Eye } from "lucide-react";

interface Class {
    id: number;
    course: string;
    time: string;
    students: number;
    studentList: Student[];
}

interface Student {
    id: number;
    name: string;
    email: string;
    grade: string;
}

interface NewClassInput {
    course: string;
    time: string;
    students: string;
}

export default function TeacherDashboard() {
    const [classes, setClasses] = useState<Class[]>([
        {
            id: 1,
            course: "Math 101",
            time: "Mon 9:00 AM - 10:30 AM",
            students: 4,
            studentList: [
                { id: 1, name: "Alice Johnson", email: "alice@school.com", grade: "A" },
                { id: 2, name: "Bob Smith", email: "bob@school.com", grade: "B+" },
                { id: 3, name: "Carol Williams", email: "carol@school.com", grade: "A-" },
                { id: 4, name: "David Brown", email: "david@school.com", grade: "B" },
            ]
        },
        {
            id: 2,
            course: "Physics 201",
            time: "Tue 11:00 AM - 12:30 PM",
            students: 3,
            studentList: [
                { id: 5, name: "Emma Davis", email: "emma@school.com", grade: "A+" },
                { id: 6, name: "Frank Miller", email: "frank@school.com", grade: "B" },
                { id: 7, name: "Grace Lee", email: "grace@school.com", grade: "A" },
            ]
        },
        {
            id: 3,
            course: "Chemistry 101",
            time: "Wed 2:00 PM - 3:30 PM",
            students: 2,
            studentList: [
                { id: 8, name: "Henry Wilson", email: "henry@school.com", grade: "B+" },
                { id: 9, name: "Ivy Martinez", email: "ivy@school.com", grade: "A-" },
            ]
        },
    ]);

    const [newClass, setNewClass] = useState<NewClassInput>({ course: "", time: "", students: "" });
    const [editingClass, setEditingClass] = useState<Class | null>(null);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

    const allStudents: Student[] = [
        { id: 1, name: "Alice Johnson", email: "alice@school.com", grade: "A" },
        { id: 2, name: "Bob Smith", email: "bob@school.com", grade: "B+" },
        { id: 3, name: "Carol Williams", email: "carol@school.com", grade: "A-" },
        { id: 4, name: "David Brown", email: "david@school.com", grade: "B" },
        { id: 5, name: "Emma Davis", email: "emma@school.com", grade: "A+" },
        { id: 6, name: "Frank Miller", email: "frank@school.com", grade: "B" },
        { id: 7, name: "Grace Lee", email: "grace@school.com", grade: "A" },
        { id: 8, name: "Henry Wilson", email: "henry@school.com", grade: "B+" },
        { id: 9, name: "Ivy Martinez", email: "ivy@school.com", grade: "A-" },
        { id: 10, name: "Jack Thompson", email: "jack@school.com", grade: "B" },
        { id: 11, name: "Kate Anderson", email: "kate@school.com", grade: "A" },
        { id: 12, name: "Liam Garcia", email: "liam@school.com", grade: "B+" },
    ];

    const handleAddClass = (): void => {
        if (newClass.course && newClass.time && newClass.students) {
            const newClassObj: Class = {
                id: Date.now(),
                course: newClass.course,
                time: newClass.time,
                students: parseInt(newClass.students),
                studentList: [],
            };
            setClasses([...classes, newClassObj]);
            setNewClass({ course: "", time: "", students: "" });
            setShowAddModal(false);
        }
    };

    const handleEditClass = (): void => {
        if (editingClass && editingClass.course && editingClass.time && editingClass.students) {
            const updatedClasses = classes.map((cls) =>
                cls.id === editingClass.id
                    ? {
                        ...cls,
                        course: editingClass.course,
                        time: editingClass.time,
                        students: editingClass.studentList.length,
                    }
                    : cls
            );
            setClasses(updatedClasses);
            setEditingClass(null);
            setShowEditModal(false);
        }
    };

    const handleDeleteClass = (id: number): void => {
        setClasses(classes.filter((cls) => cls.id !== id));
        setShowDeleteModal(false);
        setSelectedClass(null);
    };

    const handleAddStudentsToClass = (): void => {
        if (selectedClass && selectedStudentIds.length > 0) {
            const studentsToAdd = allStudents.filter(student =>
                selectedStudentIds.includes(student.id) &&
                !selectedClass.studentList.some(s => s.id === student.id)
            );

            const updatedClasses = classes.map(cls =>
                cls.id === selectedClass.id
                    ? {
                        ...cls,
                        studentList: [...cls.studentList, ...studentsToAdd],
                        students: cls.studentList.length + studentsToAdd.length
                    }
                    : cls
            );

            setClasses(updatedClasses);
            setSelectedStudentIds([]);
            setShowAddStudentModal(false);
        }
    };

    const handleRemoveStudent = (classId: number, studentId: number): void => {
        const updatedClasses = classes.map(cls =>
            cls.id === classId
                ? {
                    ...cls,
                    studentList: cls.studentList.filter(s => s.id !== studentId),
                    students: cls.studentList.length - 1
                }
                : cls
        );
        setClasses(updatedClasses);
    };

    const toggleStudentSelection = (studentId: number): void => {
        setSelectedStudentIds(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            {/* Main Content */}
            <div className="flex flex-col md:flex-row flex-1 p-6 md:p-10 gap-6">
                {/* Sidebar */}
                <aside className="md:w-1/4 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-slate-700">
                    <h2 className="text-xl font-semibold mb-4 text-white">My Classes</h2>
                    <ul className="space-y-2">
                        {classes.map((cls) => (
                            <li
                                key={cls.id}
                                onClick={() => setSelectedClass(cls)}
                                className={`px-3 py-2 rounded-lg cursor-pointer transition border ${selectedClass?.id === cls.id
                                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                                        : "bg-slate-700/50 text-slate-200 border-slate-600/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                                    }`}
                            >
                                {cls.course}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 font-semibold"
                    >
                        <Plus size={18} /> Add New Class
                    </button>
                </aside>

                {/* Main Section */}
                <main className="flex-1">
                    <h2 className="text-2xl font-bold mb-6 text-white">Class Overview</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {classes.map((cls) => (
                            <div key={cls.id} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition border border-slate-700">
                                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{cls.course}</h3>
                                <p className="text-slate-300 mb-1">
                                    <span className="font-semibold text-slate-200">Time:</span> {cls.time}
                                </p>
                                <p className="text-slate-300 mb-4">
                                    <span className="font-semibold text-slate-200">Students:</span> {cls.students}
                                </p>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => {
                                            setSelectedClass(cls);
                                            setShowStudentsModal(true);
                                        }}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition flex items-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 font-semibold"
                                    >
                                        <Eye size={16} /> View
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingClass(cls);
                                            setShowEditModal(true);
                                        }}
                                        className="bg-slate-700/70 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-600/70 transition flex items-center gap-2 border border-slate-600"
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Weekly Schedule */}
                    <section className="mt-10 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-slate-700">
                        <h3 className="text-xl font-semibold mb-4 text-white">Weekly Schedule</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Day</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Course</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Time</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Students</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map((cls) => (
                                        <tr key={cls.id} className="hover:bg-slate-700/30 transition border-b border-slate-700/50">
                                            <td className="px-4 py-3 text-slate-200">{cls.time.split(" ")[0]}</td>
                                            <td className="px-4 py-3 text-cyan-400 font-medium">{cls.course}</td>
                                            <td className="px-4 py-3 text-slate-200">{cls.time.split(" ").slice(1).join(" ")}</td>
                                            <td className="px-4 py-3 text-slate-200">{cls.students}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedClass(cls);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="text-red-400 hover:text-red-300 transition"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>

            {/* Add Class Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6 text-white">Add New Class</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Math 101"
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400"
                                    value={newClass.course}
                                    onChange={(e) =>
                                        setNewClass({ ...newClass, course: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Schedule
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Mon 9:00 AM - 10:30 AM"
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400"
                                    value={newClass.time}
                                    onChange={(e) =>
                                        setNewClass({ ...newClass, time: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Number of Students
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g., 25"
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400"
                                    value={newClass.students}
                                    onChange={(e) =>
                                        setNewClass({ ...newClass, students: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end mt-8">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-6 py-2 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddClass}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-lg shadow-cyan-500/30"
                            >
                                Add Class
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Class Modal */}
            {showEditModal && editingClass && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6 text-white">Edit Class</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                    value={editingClass.course}
                                    onChange={(e) =>
                                        setEditingClass({
                                            ...editingClass,
                                            course: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Schedule
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                    value={editingClass.time}
                                    onChange={(e) =>
                                        setEditingClass({
                                            ...editingClass,
                                            time: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Number of Students
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                    value={editingClass.students}
                                    onChange={(e) =>
                                        setEditingClass({
                                            ...editingClass,
                                            students: parseInt(e.target.value) || 0,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end mt-8">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-6 py-2 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditClass}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-lg shadow-cyan-500/30"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Delete Class?</h3>
                        <p className="text-slate-300 mb-8">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-cyan-400">"{selectedClass.course}"</span>? This action
                            cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-6 py-2 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteClass(selectedClass.id)}
                                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-400 hover:to-red-500 transition font-semibold shadow-lg shadow-red-500/30"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Students Modal */}
            {showStudentsModal && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-96 overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-6 text-white">
                            Students in {selectedClass.course}
                        </h3>

                        {selectedClass.studentList.length === 0 ? (
                            <p className="text-slate-400 text-center py-8">No students enrolled yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="px-4 py-3 text-slate-300 font-semibold">Name</th>
                                            <th className="px-4 py-3 text-slate-300 font-semibold">Email</th>
                                            <th className="px-4 py-3 text-slate-300 font-semibold">Grade</th>
                                            <th className="px-4 py-3 text-slate-300 font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedClass.studentList.map((student) => (
                                            <tr key={student.id} className="hover:bg-slate-700/30 transition border-b border-slate-700/50">
                                                <td className="px-4 py-3 text-slate-200">{student.name}</td>
                                                <td className="px-4 py-3 text-slate-200">{student.email}</td>
                                                <td className="px-4 py-3">
                                                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-lg font-semibold border border-cyan-500/30">
                                                        {student.grade}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => handleRemoveStudent(selectedClass.id, student.id)}
                                                        className="text-red-400 hover:text-red-300 transition"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="flex gap-3 justify-end mt-6">
                            <button
                                onClick={() => {
                                    setShowAddStudentModal(true);
                                    setSelectedStudentIds([]);
                                }}
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-400 hover:to-emerald-400 transition font-semibold flex items-center gap-2 shadow-lg shadow-green-500/30"
                            >
                                <Plus size={18} /> Add Students
                            </button>
                            <button
                                onClick={() => setShowStudentsModal(false)}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-lg shadow-cyan-500/30"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Students to Class Modal */}
            {showAddStudentModal && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-96 overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-6 text-white">
                            Add Students to {selectedClass.course}
                        </h3>

                        <div className="mb-4 text-sm text-slate-300">
                            Select students from the database to add to this class:
                        </div>

                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Select</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Name</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Email</th>
                                        <th className="px-4 py-3 text-slate-300 font-semibold">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allStudents.map((student) => {
                                        const isEnrolled = selectedClass.studentList.some(s => s.id === student.id);
                                        const isSelected = selectedStudentIds.includes(student.id);

                                        return (
                                            <tr
                                                key={student.id}
                                                className={`hover:bg-slate-700/30 transition border-b border-slate-700/50 ${isEnrolled ? 'opacity-50' : ''}`}
                                            >
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        disabled={isEnrolled}
                                                        onChange={() => toggleStudentSelection(student.id)}
                                                        className="w-4 h-4 text-cyan-500 cursor-pointer bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 text-slate-200">
                                                    {student.name}
                                                    {isEnrolled && <span className="ml-2 text-xs text-slate-500">(Already enrolled)</span>}
                                                </td>
                                                <td className="px-4 py-3 text-slate-200">{student.email}</td>
                                                <td className="px-4 py-3">
                                                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-lg font-semibold border border-cyan-500/30">
                                                        {student.grade}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowAddStudentModal(false);
                                    setSelectedStudentIds([]);
                                }}
                                className="px-6 py-2 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddStudentsToClass}
                                disabled={selectedStudentIds.length === 0}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30"
                            >
                                Add {selectedStudentIds.length} Student{selectedStudentIds.length !== 1 ? 's' : ''}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}