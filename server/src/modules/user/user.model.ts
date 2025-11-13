import { model, Schema } from "mongoose";
import type { IUser } from "./user.interface.js";

const userModel = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "provider", "admin"],
    default: "user",
  },
});

export const User = model("User", userModel);
