import mongoose from "mongoose";

const connectDB = async()=> {
    await mongoose.connect(process.env.DB_URL)
    .then(()=>console.log('database connected'))
    .catch(()=>console.log('failed to connected database'))
}

export default connectDB