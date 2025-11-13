import type { Request } from "express";
import { User } from "../user/user.model.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";

export const loginService = async (req: Request) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(StatusCodes.FORBIDDEN, "User not found");
  }

  const isPassMatched = await bcrypt.compare(password, user.password);

  if (!isPassMatched) {
    throw createHttpError(StatusCodes.FORBIDDEN, "Password didn't matched");
  }

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    { id: userData.id, role: userData.role },
    "1h"
  );
  const refreshToken = generateToken(
    { id: userData.id, role: userData.role },
    "7d"
  );

  return {
    success: true,
    message: "User logged in successfully",
    user: userData,
    accessToken,
    refreshToken,
  };
};
