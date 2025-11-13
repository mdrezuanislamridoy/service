import type { Document, Types } from "mongoose";

export interface IService extends Document {
  providerId: Types.ObjectId;
  name: string;
  location: string;
  category: string;
  description: string;
}
