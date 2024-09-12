import mongoose from "mongoose";

const connection: {
  isConnected?: boolean;
} = {};

export const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }
  try {
    console.log("Connecting to database");

    const con = await mongoose.connect(process.env.MONGO_URI!);
    connection.isConnected = con.connections[0].readyState === 1;
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};
