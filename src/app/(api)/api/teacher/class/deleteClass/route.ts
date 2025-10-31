import { NextResponse } from "next/server"
import Class from "@/utils/model/class/teacher/Class.Model"
import connectDb from "@/utils/connectDb"

export const DELETE = async (req: Request) => {
    try {
        await connectDb()

        const body = await req.json()
        const { id } = body

        const exist = await Class.findOneAndDelete(id)
        if (!exist) {
            return NextResponse.json("Class not found", { status: 400 })
        }

        return NextResponse.json("Deleted", { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}