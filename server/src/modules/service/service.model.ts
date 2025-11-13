import { model, Schema } from "mongoose";
import type { IService } from "./service.interface.js";

const serviceSchema = new Schema<IService>({
  providerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
});

export const Service = model("Service", serviceSchema);
