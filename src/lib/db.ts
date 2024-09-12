import mongoose from "mongoose";

let connection: {
  isConnected?: boolean;
};

export const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = con.connections[0].readyState === 1;
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};
