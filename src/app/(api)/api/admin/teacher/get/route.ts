import { NextResponse } from "next/server"
import Teacher from "@/utils/model/users/teacher/Teacher.model"
import connectDb from "@/utils/connectDb"

export const GET = async () => {
    try {
        await connectDb()

        const teacher = await Teacher.find()

        return NextResponse.json(teacher)
    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}