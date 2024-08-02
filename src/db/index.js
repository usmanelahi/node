import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import "dotenv/config";

const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Database connected ===>>>> ${connectionInstance.connection.host}`
    );
  } catch (e) {
    console.log(`ERROR WHILE CONNECTING DATABASE ==>> ${e}`);
    process.exit(1);
  }
};

export default dbConnection;
