import { NextResponse } from "next/server";
import Class from "@/utils/model/class/teacher/Class.Model";
import "../../../../../../utils/model/users/teacher/Teacher.model";
import "../../../../../../utils/model/users/student/Student.model"; 
import connectDb from "@/utils/connectDb";

export const GET = async () => {
  try {
    await connectDb();


    const getClass = await Class.find({})
      .populate("studentList");  

    return NextResponse.json(getClass);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
