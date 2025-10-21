import connectDb from "@/utils/connectDb"
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server"

import User from "@/utils/model/User.Model"
import Student from "@/utils/model/users/student/Student.model"
import Teacher from "@/utils/model/users/teacher/Teacher.model"

import jwt from 'jsonwebtoken'

const generateToken = ({ id }: { id: string }) => {
    const token = jwt.sign(
        { id: id },
        process.env.NEXT_JWT_SECRET!,
        { expiresIn: '7d' }
    )

    return token
}

export const POST = async (request: Request) => {
    try {
        await connectDb()

        const body = await request.json()
        const { username, password } = body

        const existInAdmin = await User.findOne({ username: username })
        if (existInAdmin) {
            console.log('ADMIN')
            const ifExist = await User.findOne({ username: username })
            if (!ifExist) return NextResponse.json({ error: "User doesn't exist." }, { status: 400 })
            const isMatched = await bcrypt.compare(password, ifExist.password)
            if (!isMatched) return NextResponse.json({ error: "Password does not match." }, { status: 400 })

            const token = generateToken({ id: ifExist._id })

            const response = NextResponse.json(ifExist)

            response.cookies.set('jwt', token, {
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 14
            })

            return response
        }

        const existInTeacher = await Teacher.findOne({ teacherName: username })
        if (existInTeacher) {
            console.log('teacher')
            const ifExist = await Teacher.findOne({ teacherName: username })
            if (!ifExist) return NextResponse.json({ error: "Techer doesn't exist." }, { status: 400 })
            const isMatched = await bcrypt.compare(password, ifExist.password)
            if (!isMatched) return NextResponse.json({ error: "Password does not match." }, { status: 400 })

            const token = generateToken({ id: ifExist._id })

            const response = NextResponse.json(ifExist)

            response.cookies.set('jwt', token, {
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 14
            })

            return response
        }

        const existInStudent = await Student.findOne({ studentName: username })
        if (existInStudent) {
            console.log('student')
            const ifExist = await Student.findOne({ studentName: username })
            if (!ifExist) return NextResponse.json({ error: "Techer doesn't exist." }, { status: 400 })
            const isMatched = await bcrypt.compare(password, ifExist.password)
            if (!isMatched) return NextResponse.json({ error: "Password does not match." }, { status: 400 })

            const token = generateToken({ id: ifExist._id })

            const response = NextResponse.json(ifExist)

            response.cookies.set('jwt', token, {
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 14
            })

            return response
        }
    } catch (error) {
        console.error("LOGIN ERROR:", error) // 👈 will show in Vercel logs
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}