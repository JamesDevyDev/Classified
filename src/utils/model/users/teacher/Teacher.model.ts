import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "teacher"
    },
    classCreated: {
        type: [String],
        default: []
    }
})

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema)

export default Teacher