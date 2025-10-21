import { NextResponse } from "next/server"
import Student from "@/utils/model/users/student/Student.model"
import connectDb from "@/utils/connectDb"

export const GET = async () => {
    try {
        await connectDb()

        const students = await Student.find()

        return NextResponse.json(students)
    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}