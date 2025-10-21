import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Teacher from "@/utils/model/users/teacher/Teacher.model";
import { getAuthenticatedUser } from "@/utils/verifyUser"

export const DELETE = async (req: Request) => {
    try {
        const body = await req.json()
        const { id, authUserId } = body
        await connectDb()

        const authenticatedUser = await getAuthenticatedUser()
        if (authenticatedUser?.role !== 'admin') {
            return NextResponse.json("Error. You need to be ADMIN to do this.", { status: 400 })
        }

        if (authenticatedUser?._id.toString() !== authUserId) {
            return NextResponse.json("You are not allowed to do this. This is not your account", { status: 400 })
        }

        const deleting = await Teacher.findByIdAndDelete(id)

        return NextResponse.json(`${deleting} deleted.`)
    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}