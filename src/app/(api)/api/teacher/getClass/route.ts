import { NextResponse } from "next/server"
import Class from "@/utils/model/class/teacher/Class.Model"
import '../../../../../utils/model/users/teacher/Teacher.model'

export const GET = async () => {
    try {
        const getClass = await Class.find({})

        return NextResponse.json(getClass)
    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}