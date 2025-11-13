import type { Request } from "express";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

export const create = async (req: Request) => {
  const {
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: string;
  } = req.body;

  const isUser = await User.findOne({ email });

  if (isUser) {
    throw createHttpError(StatusCodes.BAD_REQUEST, "Email already taken");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPass,
    role,
  });

  if (!user) {
    throw createHttpError(StatusCodes.FORBIDDEN, "User creation failed");
  }
  return {
    success: true,
    message: "User registered successfully",
  };
};

export const get = async (req: Request) => {
  const user = req.user;
  const userData = await User.find({ email: user.email }).select("-password");

  return {
    success: true,
    message: "User fetched successfully",
    user: userData,
  };
};
