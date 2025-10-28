'use client'

import React, { useState } from "react";
import { Trash2, Edit, Plus, Eye, Calendar, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";

interface Class {
    id: number;
    course: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    students: number;
    studentList: Student[];
    color: string;
}

interface Student {
    id: number;
    name: string;
    email: string;
    grade: string;
}

interface NewClassInput {
    course: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    color: string;
}

export default function TeacherDashboard() {
    const [classes, setClasses] = useState<Class[]>([
        {
            id: 1,
            course: "Math 101",
            dayOfWeek: "Monday",
            startTime: "09:00",
            endTime: "10:30",
            students: 4,
            color: "cyan",
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
            dayOfWeek: "Tuesday",
            startTime: "11:00",
            endTime: "12:30",
            students: 3,
            color: "purple",
            studentList: [
                { id: 5, name: "Emma Davis", email: "emma@school.com", grade: "A+" },
                { id: 6, name: "Frank Miller", email: "frank@school.com", grade: "B" },
                { id: 7, name: "Grace Lee", email: "grace@school.com", grade: "A" },
            ]
        },
        {
            id: 3,
            course: "Chemistry 101",
            dayOfWeek: "Wednesday",
            startTime: "14:00",
            endTime: "15:30",
            students: 2,
            color: "emerald",
            studentList: [
                { id: 8, name: "Henry Wilson", email: "henry@school.com", grade: "B+" },
                { id: 9, name: "Ivy Martinez", email: "ivy@school.com", grade: "A-" },
            ]
        },
        {
            id: 4,
            course: "Math 101",
            dayOfWeek: "Thursday",
            startTime: "09:00",
            endTime: "10:30",
            students: 4,
            color: "cyan",
            studentList: [
                { id: 1, name: "Alice Johnson", email: "alice@school.com", grade: "A" },
                { id: 2, name: "Bob Smith", email: "bob@school.com", grade: "B+" },
            ]
        },
        {
            id: 5,
            course: "Lab Session",
            dayOfWeek: "Friday",
            startTime: "13:00",
            endTime: "15:00",
            students: 5,
            color: "amber",
            studentList: []
        },
    ]);

    const [newClass, setNewClass] = useState<NewClassInput>({
        course: "",
        dayOfWeek: "Monday",
        startTime: "09:00",
        endTime: "10:00",
        color: "cyan"
    });
    const [editingClass, setEditingClass] = useState<Class | null>(null);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

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

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = Array.from({ length: 11 }, (_, i) => {
        const hour = i + 8;
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    const colorOptions = [
        { name: "cyan", class: "bg-cyan-500" },
        { name: "purple", class: "bg-purple-500" },
        { name: "emerald", class: "bg-emerald-500" },
        { name: "amber", class: "bg-amber-500" },
        { name: "rose", class: "bg-rose-500" },
        { name: "blue", class: "bg-blue-500" },
    ];

    const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border' | 'hover') => {
        const colorMap: Record<string, Record<string, string>> = {
            cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500', hover: 'hover:bg-cyan-600' },
            purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500', hover: 'hover:bg-purple-600' },
            emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500', hover: 'hover:bg-emerald-600' },
            amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500', hover: 'hover:bg-amber-600' },
            rose: { bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500', hover: 'hover:bg-rose-600' },
            blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500', hover: 'hover:bg-blue-600' },
        };
        return colorMap[color]?.[variant] || colorMap.cyan[variant];
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const handleAddClass = (): void => {
        if (newClass.course && newClass.dayOfWeek && newClass.startTime && newClass.endTime) {
            const newClassObj: Class = {
                id: Date.now(),
                course: newClass.course,
                dayOfWeek: newClass.dayOfWeek,
                startTime: newClass.startTime,
                endTime: newClass.endTime,
                students: 0,
                color: newClass.color,
                studentList: [],
            };
            setClasses([...classes, newClassObj]);
            setNewClass({
                course: "",
                dayOfWeek: "Monday",
                startTime: "09:00",
                endTime: "10:00",
                color: "cyan"
            });
            setShowAddModal(false);
        }
    };

    const handleEditClass = (): void => {
        if (editingClass && editingClass.course && editingClass.dayOfWeek && editingClass.startTime && editingClass.endTime) {
            const updatedClasses = classes.map((cls) =>
                cls.id === editingClass.id ? editingClass : cls
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
            setSelectedClass({
                ...selectedClass,
                studentList: [...selectedClass.studentList, ...studentsToAdd],
                students: selectedClass.studentList.length + studentsToAdd.length
            });
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
        if (selectedClass && selectedClass.id === classId) {
            setSelectedClass({
                ...selectedClass,
                studentList: selectedClass.studentList.filter(s => s.id !== studentId),
                students: selectedClass.studentList.length - 1
            });
        }
    };

    const toggleStudentSelection = (studentId: number): void => {
        setSelectedStudentIds(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const getClassesForDay = (day: string) => {
        return classes.filter(cls => cls.dayOfWeek === day).sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
        );
    };

    const totalClasses = classes.length;
    const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);
    const uniqueStudents = new Set(classes.flatMap(cls => cls.studentList.map(s => s.id))).size;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Teacher Dashboard</h1>
                            <p className="text-slate-400 text-sm mt-1">Manage your classes and students</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex bg-slate-700/50 rounded-lg p-1 border border-slate-600">
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${viewMode === 'calendar'
                                            ? 'bg-cyan-500 text-white shadow-lg'
                                            : 'text-slate-300 hover:text-white'
                                        }`}
                                >
                                    <Calendar size={18} />
                                    Calendar
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${viewMode === 'list'
                                            ? 'bg-cyan-500 text-white shadow-lg'
                                            : 'text-slate-300 hover:text-white'
                                        }`}
                                >
                                    <Users size={18} />
                                    List
                                </button>
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2.5 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition flex items-center gap-2 shadow-lg shadow-cyan-500/30 font-semibold"
                            >
                                <Plus size={18} /> Add Class
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Total Classes</p>
                                <p className="text-3xl font-bold text-white mt-2">{totalClasses}</p>
                            </div>
                            <div className="bg-cyan-500/20 p-3 rounded-lg">
                                <Calendar className="text-cyan-400" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Total Enrollments</p>
                                <p className="text-3xl font-bold text-white mt-2">{totalStudents}</p>
                            </div>
                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                <Users className="text-purple-400" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Unique Students</p>
                                <p className="text-3xl font-bold text-white mt-2">{uniqueStudents}</p>
                            </div>
                            <div className="bg-emerald-500/20 p-3 rounded-lg">
                                <Users className="text-emerald-400" size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar View */}
                {viewMode === 'calendar' && (
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
                        <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600">
                            <h2 className="text-xl font-bold text-white">Weekly Schedule</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="min-w-[1000px]">
                                {/* Days Header */}
                                <div className="grid grid-cols-6 border-b border-slate-700">
                                    <div className="bg-slate-700/30 px-4 py-3 border-r border-slate-700">
                                        <span className="text-sm font-semibold text-slate-400">Time</span>
                                    </div>
                                    {daysOfWeek.map((day) => (
                                        <div key={day} className="bg-slate-700/30 px-4 py-3 border-r border-slate-700 last:border-r-0">
                                            <span className="text-sm font-semibold text-slate-300">{day}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Time Slots */}
                                <div className="divide-y divide-slate-700/50">
                                    {timeSlots.map((time) => (
                                        <div key={time} className="grid grid-cols-6 min-h-[80px]">
                                            <div className="px-4 py-3 border-r border-slate-700/50 bg-slate-800/30 flex items-start">
                                                <span className="text-xs font-medium text-slate-400">{formatTime(time)}</span>
                                            </div>
                                            {daysOfWeek.map((day) => {
                                                const dayClasses = getClassesForDay(day).filter(cls => {
                                                    const classStartHour = parseInt(cls.startTime.split(':')[0]);
                                                    const slotHour = parseInt(time.split(':')[0]);
                                                    return classStartHour === slotHour;
                                                });

                                                return (
                                                    <div key={`${day}-${time}`} className="px-2 py-2 border-r border-slate-700/50 last:border-r-0">
                                                        {dayClasses.map((cls) => {
                                                            const startHour = parseInt(cls.startTime.split(':')[0]);
                                                            const endHour = parseInt(cls.endTime.split(':')[0]);
                                                            const startMin = parseInt(cls.startTime.split(':')[1]);
                                                            const endMin = parseInt(cls.endTime.split(':')[1]);
                                                            const duration = (endHour - startHour) + (endMin - startMin) / 60;
                                                            const height = Math.max(duration * 60, 60);

                                                            return (
                                                                <div
                                                                    key={cls.id}
                                                                    onClick={() => {
                                                                        setSelectedClass(cls);
                                                                        setShowStudentsModal(true);
                                                                    }}
                                                                    className={`${getColorClasses(cls.color, 'bg')} ${getColorClasses(cls.color, 'hover')} rounded-lg p-2 cursor-pointer transition shadow-lg mb-2 overflow-hidden`}
                                                                    style={{ minHeight: `${height}px` }}
                                                                >
                                                                    <div className="text-white font-semibold text-sm mb-1 truncate">
                                                                        {cls.course}
                                                                    </div>
                                                                    <div className="text-white/90 text-xs flex items-center gap-1 mb-1">
                                                                        <Clock size={10} />
                                                                        {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                                                                    </div>
                                                                    <div className="text-white/80 text-xs flex items-center gap-1">
                                                                        <Users size={10} />
                                                                        {cls.students} students
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classes.map((cls) => (
                            <div key={cls.id} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition border border-slate-700">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 ${getColorClasses(cls.color, 'bg')} rounded-full`}></div>
                                        <h3 className="text-xl font-semibold text-white">{cls.course}</h3>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <p className="text-slate-300 text-sm flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span className="font-medium">{cls.dayOfWeek}</span>
                                    </p>
                                    <p className="text-slate-300 text-sm flex items-center gap-2">
                                        <Clock size={14} className="text-slate-400" />
                                        {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                                    </p>
                                    <p className="text-slate-300 text-sm flex items-center gap-2">
                                        <Users size={14} className="text-slate-400" />
                                        {cls.students} {cls.students === 1 ? 'student' : 'students'}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedClass(cls);
                                            setShowStudentsModal(true);
                                        }}
                                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 text-sm font-semibold"
                                    >
                                        <Eye size={14} /> View
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingClass(cls);
                                            setShowEditModal(true);
                                        }}
                                        className="bg-slate-700/70 text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-600/70 transition flex items-center justify-center gap-2 border border-slate-600"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedClass(cls);
                                            setShowDeleteModal(true);
                                        }}
                                        className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2 border border-red-500/30"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Class Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6 text-white">Add New Class</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Math 101"
                                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400"
                                    value={newClass.course}
                                    onChange={(e) => setNewClass({ ...newClass, course: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Day of Week
                                </label>
                                <select
                                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                    value={newClass.dayOfWeek}
                                    onChange={(e) => setNewClass({ ...newClass, dayOfWeek: e.target.value })}
                                >
                                    {daysOfWeek.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                        value={newClass.startTime}
                                        onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                        value={newClass.endTime}
                                        onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Color
                                </label>
                                <div className="flex gap-3">
                                    {colorOptions.map(color => (
                                        <button
                                            key={color.name}
                                            onClick={() => setNewClass({ ...newClass, color: color.name })}
                                            className={`w-10 h-10 ${color.class} rounded-lg transition ${newClass.color === color.name
                                                    ? 'ring-4 ring-white/50 scale-110'
                                                    : 'hover:scale-105'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end mt-8">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-6 py-2.5 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddClass}
                                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-lg shadow-cyan-500/30"
                            >
                                Add Class
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Class Modal */}
            {showEditModal && editingClass && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6 text-white">Edit Class</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                    value={editingClass.course}
                                    onChange={(e) => setEditingClass({ ...editingClass, course: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Day of Week
                                </label>
                                <select
                                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                    value={editingClass.dayOfWeek}
                                    onChange={(e) => setEditingClass({ ...editingClass, dayOfWeek: e.target.value })}
                                >
                                    {daysOfWeek.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                        value={editingClass.startTime}
                                        onChange={(e) => setEditingClass({ ...editingClass, startTime: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                                        value={editingClass.endTime}
                                        onChange={(e) => setEditingClass({ ...editingClass, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Color
                                </label>
                                <div className="flex gap-3">
                                    {colorOptions.map(color => (
                                        <button
                                            key={color.name}
                                            onClick={() => setEditingClass({ ...editingClass, color: color.name })}
                                            className={`w-10 h-10 ${color.class} rounded-lg transition ${editingClass.color === color.name
                                                    ? 'ring-4 ring-white/50 scale-110'
                                                    : 'hover:scale-105'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end mt-8">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-6 py-2.5 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditClass}
                                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-lg shadow-cyan-500/30"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedClass && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Delete Class?</h3>
                        <p className="text-slate-300 mb-8">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-cyan-400">"{selectedClass.course}"</span>? This action
                            cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-6 py-2.5 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteClass(selectedClass.id)}
                                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-400 hover:to-red-500 transition font-semibold shadow-lg shadow-red-500/30"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Students Modal */}
            {showStudentsModal && selectedClass && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-3xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {selectedClass.course}
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    {selectedClass.dayOfWeek} • {formatTime(selectedClass.startTime)} - {formatTime(selectedClass.endTime)}
                                </p>
                            </div>
                            <div className={`w-4 h-4 ${getColorClasses(selectedClass.color, 'bg')} rounded-full`}></div>
                        </div>

                        {selectedClass.studentList.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="mx-auto text-slate-600 mb-4" size={48} />
                                <p className="text-slate-400 mb-6">No students enrolled yet.</p>
                                <button
                                    onClick={() => {
                                        setShowAddStudentModal(true);
                                        setSelectedStudentIds([]);
                                    }}
                                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-400 hover:to-emerald-400 transition font-semibold inline-flex items-center gap-2 shadow-lg shadow-green-500/30"
                                >
                                    <Plus size={18} /> Add Students
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto mb-6">
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
                                                    <td className="px-4 py-3 text-slate-200 font-medium">{student.name}</td>
                                                    <td className="px-4 py-3 text-slate-400">{student.email}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-lg font-semibold border border-cyan-500/30 text-sm">
                                                            {student.grade}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            onClick={() => handleRemoveStudent(selectedClass.id, student.id)}
                                                            className="text-red-400 hover:text-red-300 transition p-1 hover:bg-red-500/10 rounded"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => {
                                            setShowAddStudentModal(true);
                                            setSelectedStudentIds([]);
                                        }}
                                        className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-400 hover:to-emerald-400 transition font-semibold flex items-center gap-2 shadow-lg shadow-green-500/30"
                                    >
                                        <Plus size={18} /> Add Students
                                    </button>
                                    <button
                                        onClick={() => setShowStudentsModal(false)}
                                        className="px-6 py-2.5 bg-slate-700/70 text-slate-200 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Add Students to Class Modal */}
            {showAddStudentModal && selectedClass && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-3xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-2 text-white">
                            Add Students to {selectedClass.course}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Select students from the database to enroll in this class
                        </p>

                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="px-4 py-3 text-slate-300 font-semibold">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const availableIds = allStudents
                                                            .filter(s => !selectedClass.studentList.some(enrolled => enrolled.id === s.id))
                                                            .map(s => s.id);
                                                        setSelectedStudentIds(availableIds);
                                                    } else {
                                                        setSelectedStudentIds([]);
                                                    }
                                                }}
                                                className="w-4 h-4 text-cyan-500 cursor-pointer bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                                            />
                                        </th>
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
                                                        className="w-4 h-4 text-cyan-500 cursor-pointer bg-slate-700 border-slate-600 rounded focus:ring-cyan-500 disabled:cursor-not-allowed"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 text-slate-200 font-medium">
                                                    {student.name}
                                                    {isEnrolled && <span className="ml-2 text-xs text-slate-500">(Enrolled)</span>}
                                                </td>
                                                <td className="px-4 py-3 text-slate-400">{student.email}</td>
                                                <td className="px-4 py-3">
                                                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-lg font-semibold border border-cyan-500/30 text-sm">
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
                                className="px-6 py-2.5 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddStudentsToClass}
                                disabled={selectedStudentIds.length === 0}
                                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30"
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