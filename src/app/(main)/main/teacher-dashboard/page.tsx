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

    // Database of all available students
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
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-indigo-600">
                    Classified <span className="text-black">Teacher</span>
                </h1>
                <div className="space-x-6">
                    <button className="text-gray-700 hover:text-indigo-600">Dashboard</button>
                    <button className="text-gray-700 hover:text-indigo-600">Profile</button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row flex-1 p-6 md:p-10 gap-6">
                {/* Sidebar */}
                <aside className="md:w-1/4 bg-white p-6 rounded-xl shadow-md h-fit">
                    <h2 className="text-xl font-semibold mb-4">My Classes</h2>
                    <ul className="space-y-2 text-gray-700">
                        {classes.map((cls) => (
                            <li
                                key={cls.id}
                                onClick={() => setSelectedClass(cls)}
                                className={`px-3 py-2 rounded-lg hover:bg-indigo-100 cursor-pointer transition ${selectedClass?.id === cls.id ? "bg-indigo-600 text-white" : "bg-indigo-50"
                                    }`}
                            >
                                {cls.course}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                    >
                        <Plus size={18} /> Add New Class
                    </button>
                </aside>

                {/* Main Section */}
                <main className="flex-1">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Class Overview</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {classes.map((cls) => (
                            <div key={cls.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{cls.course}</h3>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-semibold">Time:</span> {cls.time}
                                </p>
                                <p className="text-gray-600 mb-3">
                                    <span className="font-semibold">Students:</span> {cls.students}
                                </p>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => {
                                            setSelectedClass(cls);
                                            setShowStudentsModal(true);
                                        }}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                                    >
                                        <Eye size={16} /> View Students
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingClass(cls);
                                            setShowEditModal(true);
                                        }}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                                    >
                                        <Edit size={16} /> Edit Class
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Weekly Schedule */}
                    <section className="mt-10 bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Weekly Schedule</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b">Day</th>
                                        <th className="px-4 py-2 border-b">Course</th>
                                        <th className="px-4 py-2 border-b">Time</th>
                                        <th className="px-4 py-2 border-b">Students</th>
                                        <th className="px-4 py-2 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map((cls) => (
                                        <tr key={cls.id} className="hover:bg-indigo-50">
                                            <td className="px-4 py-2 border-b">{cls.time.split(" ")[0]}</td>
                                            <td className="px-4 py-2 border-b">{cls.course}</td>
                                            <td className="px-4 py-2 border-b">{cls.time.split(" ").slice(1).join(" ")}</td>
                                            <td className="px-4 py-2 border-b">{cls.students}</td>
                                            <td className="px-4 py-2 border-b">
                                                <button
                                                    onClick={() => {
                                                        setSelectedClass(cls);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="text-red-600 hover:text-red-800 transition"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Add New Class</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Math 101"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    value={newClass.course}
                                    onChange={(e) =>
                                        setNewClass({ ...newClass, course: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Schedule
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Mon 9:00 AM - 10:30 AM"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    value={newClass.time}
                                    onChange={(e) =>
                                        setNewClass({ ...newClass, time: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Number of Students
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g., 25"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddClass}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                            >
                                Add Class
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Class Modal */}
            {showEditModal && editingClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Class</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Schedule
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Number of Students
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditClass}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Delete Class?</h3>
                        <p className="text-gray-600 mb-8">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">"{selectedClass.course}"</span>? This action
                            cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteClass(selectedClass.id)}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Students Modal */}
            {showStudentsModal && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-lg max-h-96 overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">
                            Students in {selectedClass.course}
                        </h3>

                        {selectedClass.studentList.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No students enrolled yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b font-semibold">Name</th>
                                            <th className="px-4 py-2 border-b font-semibold">Email</th>
                                            <th className="px-4 py-2 border-b font-semibold">Grade</th>
                                            <th className="px-4 py-2 border-b font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedClass.studentList.map((student) => (
                                            <tr key={student.id} className="hover:bg-indigo-50">
                                                <td className="px-4 py-2 border-b">{student.name}</td>
                                                <td className="px-4 py-2 border-b">{student.email}</td>
                                                <td className="px-4 py-2 border-b">
                                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-semibold">
                                                        {student.grade}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    <button
                                                        onClick={() => handleRemoveStudent(selectedClass.id, student.id)}
                                                        className="text-red-600 hover:text-red-800 transition"
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
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
                            >
                                <Plus size={18} /> Add Students
                            </button>
                            <button
                                onClick={() => setShowStudentsModal(false)}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Students to Class Modal */}
            {showAddStudentModal && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-lg max-h-96 overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">
                            Add Students to {selectedClass.course}
                        </h3>

                        <div className="mb-4 text-sm text-gray-600">
                            Select students from the database to add to this class:
                        </div>

                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b font-semibold">Select</th>
                                        <th className="px-4 py-2 border-b font-semibold">Name</th>
                                        <th className="px-4 py-2 border-b font-semibold">Email</th>
                                        <th className="px-4 py-2 border-b font-semibold">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allStudents.map((student) => {
                                        const isEnrolled = selectedClass.studentList.some(s => s.id === student.id);
                                        const isSelected = selectedStudentIds.includes(student.id);

                                        return (
                                            <tr
                                                key={student.id}
                                                className={`hover:bg-indigo-50 ${isEnrolled ? 'opacity-50' : ''}`}
                                            >
                                                <td className="px-4 py-2 border-b">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        disabled={isEnrolled}
                                                        onChange={() => toggleStudentSelection(student.id)}
                                                        className="w-4 h-4 text-indigo-600 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    {student.name}
                                                    {isEnrolled && <span className="ml-2 text-xs text-gray-500">(Already enrolled)</span>}
                                                </td>
                                                <td className="px-4 py-2 border-b">{student.email}</td>
                                                <td className="px-4 py-2 border-b">
                                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-semibold">
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
                                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddStudentsToClass}
                                disabled={selectedStudentIds.length === 0}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
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