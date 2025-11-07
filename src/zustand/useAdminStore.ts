import { create } from 'zustand'

interface AdminStore {
    students: any[]
    createStudent: (studentName: string, password: string) => Promise<any>
    deleteStudent: (id: string) => Promise<any>
    getStudent: () => Promise<any>

    teachers: any[]
    createTeacher: (teacherName: string, password: string) => Promise<any>
    deleteTeacher: (id: string) => Promise<any>
    getTeacher: () => Promise<any>

    getAllLogs: () => Promise<any>

}

const useAdminStore = create<AdminStore>((set, get) => ({
    students: [],
    createStudent: async (studentName: string, password: string) => {
        try {
            let res = await fetch("/api/admin/student/create", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ studentName, password })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    },
    deleteStudent: async (id: string) => {
        try {
            let res = await fetch("/api/admin/student/delete", {
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
    createTeacher: async (teacherName: string, password: string) => {
        try {
            let res = await fetch("/api/admin/teacher/create", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ teacherName, password })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    },
    deleteTeacher: async (id: string) => {
        try {
            let res = await fetch("/api/admin/teacher/delete", {
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

    getAllLogs: async () => {
        try {
            let res = await fetch("/api/admin/logs")
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useAdminStore
