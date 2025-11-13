import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/dotenv.js";
export const generateToken = (data: any, expiresIn: any = "1h") => {
  return jwt.sign(data, env.JWT_SECRET as string, { expiresIn });
};
