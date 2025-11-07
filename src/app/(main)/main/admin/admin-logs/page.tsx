'use client'

import React, { useState, useEffect } from 'react';
import {
    FileText,
    Search,
    Filter,
    Calendar,
    UserPlus,
    Edit2,
    Trash2,
    Clock,
    User,
    ChevronDown,
    Download
} from 'lucide-react';

import useAdminStore from '@/zustand/useAdminStore';

const AdminLogs = () => {
    const { getAllLogs } = useAdminStore();

    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    // 🧠 Fetch logs from backend
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const data = await getAllLogs(); // Assuming getAllLogs returns an array
                setLogs(data?.logs || []);
            } catch (err) {
                console.error("Failed to fetch logs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [getAllLogs]);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'create':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'update':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'delete':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'create':
                return UserPlus;
            case 'update':
                return Edit2;
            case 'delete':
                return Trash2;
            default:
                return FileText;
        }
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch =
            log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.userId?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterType === 'all' || log.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                            <FileText className="text-cyan-400" size={36} />
                            Activity Logs
                        </h1>
                        <p className="text-slate-400 mt-2">Monitor all system activities and changes</p>
                    </div>

                    <button className="btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/30">
                        <Download size={18} />
                        Export Logs
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-6 rounded-xl border border-green-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Created</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {logs.filter(log => log.type === 'create').length}
                                </p>
                            </div>
                            <div className="bg-green-500/20 p-3 rounded-lg">
                                <UserPlus className="text-green-400" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Updated</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {logs.filter(log => log.type === 'update').length}
                                </p>
                            </div>
                            <div className="bg-blue-500/20 p-3 rounded-lg">
                                <Edit2 className="text-blue-400" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-xl border border-red-500/30 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Deleted</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {logs.filter(log => log.type === 'delete').length}
                                </p>
                            </div>
                            <div className="bg-red-500/20 p-3 rounded-lg">
                                <Trash2 className="text-red-400" size={28} />
                            </div>
                        </div>
                    </div>
                </div>

               
                {/* Logs */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
                    <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Clock className="text-cyan-400" size={22} />
                            Recent Activity
                        </h2>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-12 text-slate-400">Loading logs...</div>
                        ) : filteredLogs.length === 0 ? (
                            <div className="text-center py-12">
                                <FileText className="mx-auto text-slate-600 mb-4" size={48} />
                                <p className="text-slate-400 text-lg">No logs found</p>
                                <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredLogs.map((log) => {
                                    const Icon = getTypeIcon(log.type);
                                    return (
                                        <div
                                            key={log._id}
                                            className="bg-slate-900/30 border border-slate-700/50 rounded-lg p-5 hover:bg-slate-700/20 transition-all duration-300 hover:border-slate-600"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                <div className={`p-3 rounded-lg ${getTypeColor(log.type)} border flex-shrink-0`}>
                                                    <Icon size={24} />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                                        <h3 className="text-lg font-semibold text-white">{log.action}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border w-fit ${getTypeColor(log.type)}`}>
                                                            {log.type.toUpperCase()}
                                                        </span>
                                                    </div>

                                                    <p className="text-slate-400 text-sm mb-3">{log.details}</p>

                                                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                                        <span className="flex items-center gap-1.5">
                                                            <User size={14} />
                                                            {log?.teacherId?.teacherName || 'Unknown User'}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar size={14} />
                                                            {new Date(log.createdAt).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogs;
