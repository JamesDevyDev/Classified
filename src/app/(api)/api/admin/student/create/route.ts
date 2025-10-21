import { NextResponse } from "next/server"
import connectDb from "@/utils/connectDb"
import Student from "@/utils/model/users/student/Student.model"
import { getAuthenticatedUser } from "@/utils/verifyUser"
import bcrypt from 'bcrypt'

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { studentName, password, authUserId } = body

        await connectDb()

        const authenticatedUser = await getAuthenticatedUser()
        if (authenticatedUser?.role !== 'admin') {
            return NextResponse.json("Error. You need to be ADMIN to do this.", { status: 400 })
        }

        if (authenticatedUser?._id.toString() !== authUserId) {
            return NextResponse.json("You are not allowed to do this. This is not your account", { status: 400 })
        }

        const ifExist = await Student.findOne({ studentName: studentName })
        if (ifExist) {
            return NextResponse.json("Student Name already exists.", { status: 400 })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newStudent = new Student({
            studentName: studentName,
            password: hashedPassword
        })

        await newStudent.save()
        return NextResponse.json(`${newStudent} Created`, { status: 201 })
    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}