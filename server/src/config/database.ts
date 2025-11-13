import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { env } from "./dotenv.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URL as string);
  } catch (error) {
    throw createHttpError(
      StatusCodes.BAD_REQUEST,
      "Database connection failed"
    );
  }
};

export default connectDB