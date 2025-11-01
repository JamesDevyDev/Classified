import mongoose from "mongoose";
import '../../class/teacher/Class.Model'

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        unique: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "student",
    },
    class: [
        {
            type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing
            ref: "class", // Reference to the Class model
        },
    ],
});

studentSchema.pre("save", async function (next) {
    if (this.studentId) return next();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const count = await mongoose.model("student").countDocuments({
        studentId: { $regex: `^${year}-${month}-` },
    });

    const newCount = String(count + 1).padStart(3, "0");

    this.studentId = `${year}-${month}-${newCount}`;
    next();
});

const Student = mongoose.models.student || mongoose.model("student", studentSchema);

export default Student;
