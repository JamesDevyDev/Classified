import { create } from 'zustand'

interface StudentStore {
    getStudentClass: (studentId: string) => Promise<any>
}

const useStudentStore = create<StudentStore>((set, get) => ({
    getStudentClass: async (studentId: string) => {
        try {
            let res = await fetch("/api/student/getMyClass", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ studentId })
            })
            if (!res.ok) return console.error("Error with the fetch")

            const data = await res.json()
            return data
        } catch (error) {

        }
    }
}))

export default useStudentStore
