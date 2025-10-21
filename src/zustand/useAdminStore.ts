import { create } from 'zustand'

interface AdminStore {
    students: any[]
    createStudent: (studentName: string, password: string, authUserId: string) => Promise<any>
    deleteStudent: (id: string, authUserId: string) => Promise<any>
    getStudent: () => Promise<any>

    teachers: any[]
    createTeacher: (teacherName: string, password: string, authUserId: string) => Promise<any>
    deleteTeacher: (id: string, authUserId: string) => Promise<any>
    getTeacher: () => Promise<any>

}

const useAdminStore = create<AdminStore>((set, get) => ({
    students: [],
    createStudent: async (studentName: string, password: string, authUserId: string) => {
        try {
            let res = await fetch("/api/admin/student/create", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ studentName, password, authUserId })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    },
    deleteStudent: async (id: string, authUserId: string) => {
        try {
            let res = await fetch("/api/admin/student/delete", {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ id, authUserId })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    },
    getStudent: async () => {
        try {
            let res = await fetch("/api/admin/student/get")
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
            set({ students: data })
            return data
        } catch (error) {
            console.log(error)
        }
    },

    teachers: [],
    createTeacher: async (teacherName: string, password: string, authUserId: string) => {
        try {
            let res = await fetch("/api/admin/teacher/create", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ teacherName, password, authUserId })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    },
    deleteTeacher: async (id: string, authUserId: string) => {
        try {
            let res = await fetch("/api/admin/teacher/delete", {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ id, authUserId })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    },
    getTeacher: async () => {
        try {
            let res = await fetch("/api/admin/teacher/get")
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
            set({ teachers: data })
            return data
        } catch (error) {
            console.log(error)
        }
    },
}))

export default useAdminStore
