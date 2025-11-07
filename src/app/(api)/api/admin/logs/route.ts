import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Logs from "@/utils/model/logs/Logs.Model";

import '@/utils/model/users/teacher/Teacher.model'

// Get all logs
export const GET = async () => {
    try {
        await connectDb();

        const logs = await Logs.find().sort({ createdAt: -1 }).populate('teacherId', 'teacherName')

        return NextResponse.json({ logs }, { status: 200 });
    } catch (error) {
        console.error("GET /api/logs error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
