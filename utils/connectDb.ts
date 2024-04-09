import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    isConnected = true;
    console.log("MongoDb connected");
  } catch (error) {
    console.error(error);
  }
};
