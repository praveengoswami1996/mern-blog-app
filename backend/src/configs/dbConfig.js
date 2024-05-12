import mongoose from "mongoose";

const connectWithDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected successfully: ${connection.connection.host}`)
    } catch (error) {
        console.error(`Error connecting MongoDB: ${error.message}`);
        process.exit();
    }
}

export default connectWithDB;