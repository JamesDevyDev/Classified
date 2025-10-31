import { NextResponse } from "next/server";
import Class from "@/utils/model/class/teacher/Class.Model";
import connectDb from "@/utils/connectDb";

// Validate 24-hour time format (HH:MM)
function isValid24HourTime(time: string): boolean {
    const match = time.match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/);
    return match !== null;
}

// Convert "6:00 PM" to "18:00" (for backward compatibility)
function convertTo24Hour(time: string): string | null {
    try {
        // Check if already in 24-hour format
        if (isValid24HourTime(time)) {
            return time;
        }

        // Try 12-hour format
        const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!match) return null;

        let [_, hours, minutes, period] = match;
        let h = parseInt(hours, 10);
        const m = parseInt(minutes, 10);

        if (period.toUpperCase() === "PM" && h !== 12) h += 12;
        if (period.toUpperCase() === "AM" && h === 12) h = 0;

        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    } catch {
        return null;
    }
}

export const PATCH = async (req: Request) => {
    try {
        await connectDb()

        const body = await req.json();
        const { id, course, dayOfWeek, startTime, endTime, color } = body;

        // ✅ Check if class ID is provided
        if (!id) {
            return NextResponse.json({ error: "Class ID is required." }, { status: 400 });
        }

        // ✅ Find the class
        const existingClass = await Class.findById(id);
        if (!existingClass) {
            return NextResponse.json({ error: "Class not found." }, { status: 404 });
        }

        // ✅ Build update object with only provided fields
        const updateData: any = {};

        // Course name validation
        if (course !== undefined) {
            if (!course.trim()) {
                return NextResponse.json({ error: "Course name cannot be empty." }, { status: 400 });
            }
            updateData.course = course;
        }

        // Day of week validation
        if (dayOfWeek !== undefined) {
            const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            if (!validDays.includes(dayOfWeek)) {
                return NextResponse.json({ error: "Invalid dayOfWeek. Must be Monday–Friday only." }, { status: 400 });
            }
            updateData.dayOfWeek = dayOfWeek;
        }

        // Time validation
        if (startTime !== undefined || endTime !== undefined) {
            const newStartTime = startTime ? convertTo24Hour(startTime) : existingClass.startTime;
            const newEndTime = endTime ? convertTo24Hour(endTime) : existingClass.endTime;

            if ((startTime && !newStartTime) || (endTime && !newEndTime)) {
                return NextResponse.json({
                    error: "Invalid time format. Use 24-hour format (HH:MM) or 12-hour format (hh:mm AM/PM)."
                }, { status: 400 });
            }

            // Validate time range 06:00–22:00
            if (newStartTime && newStartTime < "06:00") {
                return NextResponse.json({
                    error: "Start time must be at or after 6:00 AM."
                }, { status: 400 });
            }

            if (newEndTime && newEndTime > "22:00") {
                return NextResponse.json({
                    error: "End time must be at or before 10:00 PM."
                }, { status: 400 });
            }

            // Ensure start < end
            if (newStartTime && newEndTime && newStartTime >= newEndTime) {
                return NextResponse.json({
                    error: "End time must be later than start time."
                }, { status: 400 });
            }

            if (newStartTime) updateData.startTime = newStartTime;
            if (newEndTime) updateData.endTime = newEndTime;
        }

        // Color validation
        if (color !== undefined) {
            const validColors = ["cyan", "purple", "emerald", "amber", "rose", "blue"];
            if (!validColors.includes(color)) {
                return NextResponse.json({ error: "Invalid color option." }, { status: 400 });
            }
            updateData.color = color;
        }

        // ✅ Update the class
        const updatedClass = await Class.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        return NextResponse.json({
            message: "Class updated successfully.",
            class: updatedClass
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating class:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
};