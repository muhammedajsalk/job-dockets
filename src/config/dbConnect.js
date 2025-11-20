import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connection successful.');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

export default connectDB