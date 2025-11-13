import type { Document } from "mongoose";

type Role = "user" | "provider" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
}
