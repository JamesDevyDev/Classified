import mongoose from 'mongoose';
import '@/utils/model/users/teacher/Teacher.model'

const logSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
    },
    teacherId: {
        ref: "Teacher",
        type: mongoose.Types.ObjectId,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['create', 'update', 'delete'],
        required: true,
    }
}, { timestamps: true });

const Logs = mongoose.models.Log || mongoose.model('Log', logSchema);

export default Logs
