import mongoose from "mongoose";
import '../../class/teacher/Class.Model'

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "teacher",
  },
  classCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,  // Reference to ObjectId
      ref: "class",  // Reference to the Class model
    },
  ],
});

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
