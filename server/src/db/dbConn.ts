import mongoose from 'mongoose'

async function connectDB() {
    try {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.connect(process.env.MONGODB_LOGIN, {
                dbName: 'jordmatning',
            })
        } else {
            await mongoose.connect(process.env.MONGODB_DEV_LOGIN, {
                dbName: 'jordmatning',
            })
        }
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
    }
}

export { connectDB }
