import { configDotenv } from "dotenv";
configDotenv();

export const env = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};
