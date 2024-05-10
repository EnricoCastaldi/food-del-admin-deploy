import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect ('mongodb+srv://enricocastaldi89:27081989@cluster0.lxwkjar.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}