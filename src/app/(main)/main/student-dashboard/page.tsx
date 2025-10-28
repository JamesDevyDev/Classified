'use client'

import React, { useState } from "react";
import { Calendar, Clock, Users, BookOpen, ChevronLeft, ChevronRight, Video, Bell, User } from "lucide-react";

interface Class {
    id: number;
    course: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    teacher: string;
    color: string;
    room?: string;
}

export default function StudentDashboard() {
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);

    const enrolledClasses: Class[] = [
        {
            id: 1,
            course: "Math 101",
            dayOfWeek: "Monday",
            startTime: "09:00",
            endTime: "10:30",
            teacher: "Mr. Smith",
            color: "cyan",
            room: "Room 204"
        },
        {
            id: 2,
            course: "Physics 201",
            dayOfWeek: "Tuesday",
            startTime: "11:00",
            endTime: "12:30",
            teacher: "Ms. Johnson",
            color: "purple",
            room: "Lab 3"
        },
        {
            id: 3,
            course: "Chemistry 101",
            dayOfWeek: "Wednesday",
            startTime: "14:00",
            endTime: "15:30",
            teacher: "Dr. Lee",
            color: "emerald",
            room: "Lab 1"
        },
        {
            id: 4,
            course: "Math 101",
            dayOfWeek: "Thursday",
            startTime: "09:00",
            endTime: "10:30",
            teacher: "Mr. Smith",
            color: "cyan",
            room: "Room 204"
        },
        {
            id: 5,
            course: "English Literature",
            dayOfWeek: "Friday",
            startTime: "13:00",
            endTime: "14:30",
            teacher: "Prof. Williams",
            color: "amber",
            room: "Room 105"
        },
        {
            id: 6,
            course: "Physics 201",
            dayOfWeek: "Thursday",
            startTime: "11:00",
            endTime: "12:30",
            teacher: "Ms. Johnson",
            color: "purple",
            room: "Lab 3"
        },
    ];

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = Array.from({ length: 11 }, (_, i) => {
        const hour = i + 8;
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

    const getClassesForDay = (day: string) => {
        return enrolledClasses.filter(cls => cls.dayOfWeek === day).sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
        );
    };

    const uniqueCourses = Array.from(new Set(enrolledClasses.map(c => c.course)));
    const totalClasses = enrolledClasses.length;
    const todayClasses = getClassesForDay(daysOfWeek[new Date().getDay() - 1] || "Monday").length;

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
                            <button className="p-2 text-slate-400 hover:text-white transition hover:bg-slate-700/50 rounded-lg">
                                <Bell size={20} />
                            </button>
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
                                <div className="relative">
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
                                    
                                    {/* Absolute positioned classes that span multiple slots */}
                                    {daysOfWeek.map((day, dayIndex) => {
                                        const dayClasses = getClassesForDay(day);
                                        return dayClasses.map((cls) => {
                                            const startHour = parseInt(cls.startTime.split(':')[0]);
                                            const endHour = parseInt(cls.endTime.split(':')[0]);
                                            const startMin = parseInt(cls.startTime.split(':')[1]);
                                            const endMin = parseInt(cls.endTime.split(':')[1]);
                                            
                                            const startSlotIndex = startHour - 8;
                                            const startOffset = (startMin / 60) * 80;
                                            const duration = (endHour - startHour) + (endMin - startMin) / 60;
                                            const height = duration * 80;
                                            
                                            const leftPosition = ((dayIndex + 1) / 6) * 100;
                                            const width = (1 / 6) * 100;

                                            return (
                                                <div
                                                    key={cls.id}
                                                    onClick={() => setSelectedClass(cls)}
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
                                                    <div className="text-white/80 text-xs flex items-center gap-1">
                                                        <User size={10} />
                                                        {cls.teacher}
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
                    <div className="flex gap-6">
                        {/* Sidebar with Enrolled Courses */}
                        <aside className="w-80 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-slate-700">
                            <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                                <BookOpen size={20} />
                                Enrolled Courses
                            </h2>
                            <ul className="space-y-2">
                                {uniqueCourses.map((course, idx) => {
                                    const courseClass = enrolledClasses.find(c => c.course === course);
                                    return (
                                        <li
                                            key={idx}
                                            className="px-4 py-3 bg-slate-700/50 text-slate-200 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-300 cursor-pointer transition border border-slate-600/50 flex items-center gap-3"
                                        >
                                            <div className={`w-3 h-3 ${getColorClasses(courseClass?.color || 'cyan', 'bg')} rounded-full`}></div>
                                            {course}
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-6 text-white">Upcoming Classes</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {enrolledClasses.slice(0, 6).map((cls) => (
                                    <div
                                        key={cls.id}
                                        className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition border border-slate-700"
                                    >
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
                                                <User size={14} className="text-slate-400" />
                                                {cls.teacher}
                                            </p>
                                            {cls.room && (
                                                <p className="text-slate-300 text-sm flex items-center gap-2">
                                                    <BookOpen size={14} className="text-slate-400" />
                                                    {cls.room}
                                                </p>
                                            )}
                                        </div>
                                        <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2.5 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 font-semibold flex items-center justify-center gap-2">
                                            <Video size={16} />
                                            Join Class
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Weekly Schedule Table */}
                            <section className="mt-10 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-slate-700">
                                <h3 className="text-xl font-semibold mb-4 text-white">Complete Weekly Schedule</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-700">
                                                <th className="px-4 py-3 text-slate-300 font-semibold">Day</th>
                                                <th className="px-4 py-3 text-slate-300 font-semibold">Course</th>
                                                <th className="px-4 py-3 text-slate-300 font-semibold">Time</th>
                                                <th className="px-4 py-3 text-slate-300 font-semibold">Teacher</th>
                                                <th className="px-4 py-3 text-slate-300 font-semibold">Room</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enrolledClasses.map((cls) => (
                                                <tr key={cls.id} className="hover:bg-slate-700/30 transition border-b border-slate-700/50">
                                                    <td className="px-4 py-3 text-slate-200 font-medium">{cls.dayOfWeek}</td>
                                                    <td className="px-4 py-3 flex items-center gap-2">
                                                        <div className={`w-2 h-2 ${getColorClasses(cls.color, 'bg')} rounded-full`}></div>
                                                        <span className={`${getColorClasses(cls.color, 'text')} font-medium`}>{cls.course}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-200">
                                                        {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-200">{cls.teacher}</td>
                                                    <td className="px-4 py-3 text-slate-400 text-sm">{cls.room || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </div>

            {/* Class Details Modal */}
            {selectedClass && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
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
                                <User size={18} className="text-slate-400" />
                                <span>{selectedClass.teacher}</span>
                            </div>
                            {selectedClass.room && (
                                <div className="flex items-center gap-3 text-slate-300">
                                    <BookOpen size={18} className="text-slate-400" />
                                    <span>{selectedClass.room}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3 text-slate-300">
                                <Clock size={18} className="text-slate-400" />
                                <span>{formatTime(selectedClass.startTime)} - {formatTime(selectedClass.endTime)}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedClass(null)}
                                className="flex-1 px-6 py-2.5 text-slate-300 bg-slate-700/70 rounded-lg hover:bg-slate-600/70 transition font-semibold border border-slate-600"
                            >
                                Close
                            </button>
                            <button className="flex-1 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2">
                                <Video size={18} />
                                Join Class
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}