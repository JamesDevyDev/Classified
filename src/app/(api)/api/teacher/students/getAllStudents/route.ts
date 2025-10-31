import { NextResponse } from "next/server"
import connectDb from "@/utils/connectDb"
import Student from "@/utils/model/users/student/Student.model"

export const GET = async () => {
    try {

        await connectDb()

        const allStudents = await Student.find({})

        return NextResponse.json(allStudents, { status: 200 })

    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}