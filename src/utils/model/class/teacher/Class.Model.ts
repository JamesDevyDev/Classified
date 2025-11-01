import mongoose from "mongoose";
import "../../users/teacher/Teacher.model"
import "../../users/student/Student.model";

const classSchema = new mongoose.Schema({
    teacherId: {
        ref: "Teacher",
        type: mongoose.Types.ObjectId
    },
    course: {
        type: String,
        required: true
    },
    dayOfWeek: {
        type: String,
        default: "",
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    students: {
        type: Number,
    },
    color: {
        type: String,
        enum: ["cyan", "purple", "emerald", "amber", "rose", "blue"],
        default: "cyan"
    },
    studentList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "student", 
        default: [] 
    }
})

const Class = mongoose.models.Class || mongoose.model("Class", classSchema)

export default Class
