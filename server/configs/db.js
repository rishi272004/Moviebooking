import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 * Uses MONGODB_URL from environment variables (K8s secrets)
 */
const connectDB = async () => {
    try{
        // Log when database connection is established
        mongoose.connection.on('connected', ()=> console.log("Database connected"));
        
        // Connect to MongoDB with connection string from environment
        await mongoose.connect(`${process.env.MONGODB_URL}/seatbooking`)
    }
    catch(error){
        // Log connection errors
        console.log(error.message);
    }
}

export default connectDB;