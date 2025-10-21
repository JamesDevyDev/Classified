import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from './model/User.Model';
import Teacher from './model/users/teacher/Teacher.model';
import Student from './model/users/student/Student.model';
import connectDb from './connectDb';

export const getAuthenticatedUser = async () => {
    await connectDb();

    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;
    if (!token) return { error: 'No authentication token found.' };

    try {
        const decoded = jwt.verify(token, process.env.NEXT_JWT_SECRET!) as { id: string };

        // Try to find user in Admins
        let user = await User.findById(decoded.id).select('-password');
        if (user) {
            return { user, role: 'admin' };
        }

        // Try to find user in Teachers
        user = await Teacher.findById(decoded.id).select('-password');
        if (user) {
            return { user, role: 'teacher' };
        }

        // Try to find user in Students
        user = await Student.findById(decoded.id).select('-password');
        if (user) {
            return { user, role: 'student' };
        }

        return { error: 'User not found.' };
    } catch (err) {
        console.error('JWT verification failed:', err);
        return { error: 'Invalid or expired token.' };
    }
};
