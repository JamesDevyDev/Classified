import mongoose from "mongoose"

const connectDb = async () => {
    try {
        console.log('Connected to mongodb')
        await mongoose.connect(process.env.NEXT_MONGO_URL!)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb