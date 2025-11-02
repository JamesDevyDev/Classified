'use client'

import React, { useState, useEffect } from "react";
import { Calendar, Clock, BookOpen, User, X, Users } from "lucide-react";
import useStudentStore from "@/zustand/useStudentStore";
import useAuthStore from "@/zustand/useAuthStore";

interface Class {
    _id: string;
    course: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    teacherId: any;
    color: string;
    students: number;
    studentList: string[];
}

export default function StudentDashboard() {
    const { getStudentClass } = useStudentStore()
    const { getLoggedInUser, authUser } = useAuthStore();

    const [isLoading, setIsLoading] = useState(true);
    const [classes, setClasses] = useState<Class[]>([]);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [showClassModal, setShowClassModal] = useState(false);

    useEffect(() => {
        (async () => {
            await getLoggedInUser();
            setIsLoading(false);
        })();
    }, [getLoggedInUser]);

    useEffect(() => {
        (async () => {
            if (authUser?.user?._id) {
                const data = await getStudentClass(authUser.user._id);
                console.log("Student data:", data);
                setClasses(data)
            }
        })();
    }, [authUser, getStudentClass]);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = Array.from({ length: 17 }, (_, i) => {
        const hour = i + 6;
        return `${hour.toString().padStart(2, '0')}:00`;
    });

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

    const getClassesForDay = (day: string): Class[] => {
        return classes.filter((cls: Class) => cls.dayOfWeek === day).sort((a: Class, b: Class) =>
            a.startTime.localeCompare(b.startTime)
        );
    };

    const uniqueCourses = Array.from(new Set(classes.map(c => c.course)));
    const totalClasses = classes.length;
    const todayClasses = getClassesForDay(daysOfWeek[new Date().getDay() - 1] || "Monday").length;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-cyan-500 mb-4"></div>
                    <p className="text-slate-400 text-lg">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
                            <p className="text-slate-400 text-sm mt-1">Welcome back! Here's your schedule</p>
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
                                    <BookOpen size={18} />
                                    Courses
                                </button>
                            </div>
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
                                <p className="text-slate-300 text-sm font-medium">Enrolled Courses</p>
                                <p className="text-3xl font-bold text-white mt-2">{uniqueCourses.length}</p>
                            </div>
                            <div className="bg-cyan-500/20 p-3 rounded-lg">
                                <BookOpen className="text-cyan-400" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Weekly Classes</p>
                                <p className="text-3xl font-bold text-white mt-2">{totalClasses}</p>
                            </div>
                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                <Calendar className="text-purple-400" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Today's Classes</p>
                                <p className="text-3xl font-bold text-white mt-2">{todayClasses}</p>
                            </div>
                            <div className="bg-emerald-500/20 p-3 rounded-lg">
                                <Clock className="text-emerald-400" size={28} />
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
                                <div className="relative" style={{ minHeight: `${17 * 80}px` }}>
                                    {timeSlots.map((time) => (
                                        <div key={time} className="grid grid-cols-6 h-[80px] border-b border-slate-700/50">
                                            <div className="px-4 py-3 border-r border-slate-700/50 bg-slate-800/30 flex items-start">
                                                <span className="text-xs font-medium text-slate-400">{formatTime(time)}</span>
                                            </div>
                                            {daysOfWeek.map((day) => (
                                                <div key={`${day}-${time}`} className="px-2 py-2 border-r border-slate-700/50 last:border-r-0 relative">
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                    {/* Absolute positioned classes */}
                                    {daysOfWeek.map((day, dayIndex) => {
                                        const dayClasses = getClassesForDay(day);
                                        return dayClasses.map((cls) => {
                                            const startHour = parseInt(cls.startTime.split(':')[0]);
                                            const endHour = parseInt(cls.endTime.split(':')[0]);
                                            const startMin = parseInt(cls.startTime.split(':')[1]);
                                            const endMin = parseInt(cls.endTime.split(':')[1]);

                                            const startSlotIndex = startHour - 6;
                                            const startOffset = (startMin / 60) * 80;
                                            const duration = (endHour - startHour) + (endMin - startMin) / 60;
                                            const height = duration * 80;

                                            const leftPosition = ((dayIndex + 1) / 6) * 100;
                                            const width = (1 / 6) * 100;

                                            return (
                                                <div
                                                    key={cls._id}
                                                    onClick={() => {
                                                        setSelectedClass(cls);
                                                        setShowClassModal(true);
                                                    }}
                                                    className={`absolute ${getColorClasses(cls.color, 'bg')} ${getColorClasses(cls.color, 'hover')} rounded-lg p-2 cursor-pointer transition shadow-lg overflow-hidden`}
                                                    style={{
                                                        top: `${startSlotIndex * 80 + startOffset}px`,
                                                        left: `${leftPosition}%`,
                                                        width: `calc(${width}% - 16px)`,
                                                        height: `${height}px`,
                                                        marginLeft: '8px',
                                                        marginRight: '8px',
                                                    }}
                                                >
                                                    <div className="text-white font-semibold text-sm mb-1 truncate">
                                                        {cls.course}
                                                    </div>
                                                    <div className="text-white/90 text-xs flex items-center gap-1 mb-1">
                                                        <Clock size={10} />
                                                        {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                                                    </div>
                                                    <div className="text-white/90 text-xs flex items-center gap-1 mb-1">
                                                        <Users size={10} />
                                                        {cls?.teacherId?.teacherName}
                                                    </div>

                                                </div>
                                            );
                                        });
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classes.map((cls) => (
                            <div key={cls._id} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition border border-slate-700">
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

                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedClass(cls);
                                        setShowClassModal(true);
                                    }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2.5 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition shadow-lg shadow-cyan-500/30 font-semibold flex items-center justify-center gap-2"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Class Details Modal */}
            {showClassModal && selectedClass && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="relative bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
                        <button
                            onClick={() => setShowClassModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
                            aria-label="Close"
                        >
                            <X size={22} />
                        </button>

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

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="bg-slate-700/50 p-2 rounded-lg">
                                    <User size={18} className="text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Students Enrolled</p>
                                    <p className="font-medium">{selectedClass.students} {selectedClass.students === 1 ? 'student' : 'students'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="bg-slate-700/50 p-2 rounded-lg">
                                    <Clock size={18} className="text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Schedule</p>
                                    <p className="font-medium">{formatTime(selectedClass.startTime)} - {formatTime(selectedClass.endTime)}</p>
                                </div>

                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="bg-slate-700/50 p-2 rounded-lg">
                                    <Users size={18} className="text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Teacher</p>
                                    <p className="font-medium">{selectedClass?.teacherId?.teacherName}</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowClassModal(false)}
                                className="flex-1 px-6 py-2.5 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}