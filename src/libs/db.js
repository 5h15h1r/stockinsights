import mongoose from "mongoose";

const connectMongoDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected");
    } catch (error) {
        console.log(error);
    }
}
export default connectMongoDB;