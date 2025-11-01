import { create } from 'zustand'

interface TeacherStore {
    getClass: () => Promise<any>
    createClass: (teacherId: number, course: string, dayOfWeek: string, startTime: string, endTime: string, students: number, color: string, studentList: string[]) => Promise<any>
    deleteClass: (id: number) => Promise<any>
    editClass: (id: number, course?: string, dayOfWeek?: string, startTime?: string, endTime?: string, color?: string) => Promise<any>
    getAllStudents: () => Promise<any>
    addStudentToClass: (studentId: any, classId: any) => Promise<any>
}

const useTeacherStore = create<TeacherStore>((set, get) => ({
    getClass: async () => {
        try {
            const res = await fetch("/api/teacher/class/getClass");
            const data = await res.json();
            return data
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    },
    createClass: async (teacherId: number, course: string, dayOfWeek: string, startTime: string, endTime: string, students: number, color: string, studentList: string[]) => {
        try {
            let res = await fetch("/api/teacher/class/createClass", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ teacherId, course, dayOfWeek, startTime, endTime, students, color, studentList })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    },
    deleteClass: async (id: number) => {
        try {
            let res = await fetch("/api/teacher/class/deleteClass", {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    },
    editClass: async (id: number, course?: string, dayOfWeek?: string, startTime?: string, endTime?: string, color?: string) => {
        try {
            // Build update payload with only provided fields
            const updatePayload: any = { id };
            if (course !== undefined) updatePayload.course = course;
            if (dayOfWeek !== undefined) updatePayload.dayOfWeek = dayOfWeek;
            if (startTime !== undefined) updatePayload.startTime = startTime;
            if (endTime !== undefined) updatePayload.endTime = endTime;
            if (color !== undefined) updatePayload.color = color;

            let res = await fetch("/api/teacher/class/editClass", {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatePayload)
            })

            if (!res.ok) {
                const error = await res.json();
                console.error("Error editing class:", error);
                throw new Error(error.error || "Failed to edit class");
            }

            const data = await res.json()
            return data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    getAllStudents: async () => {
        try {
            let res = await fetch("/api/teacher/students/getAllStudents", {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    },
    addStudentToClass: async (classId: any, studentId: any) => {
        try {
            let res = await fetch("/api/teacher/students/addStudentToClass", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ classId, studentId })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useTeacherStore
