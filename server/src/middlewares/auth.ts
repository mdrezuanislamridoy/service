import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/dotenv.js";
import { User } from "../modules/user/user.model.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw createHttpError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;

    if (!decoded)
      throw createHttpError(StatusCodes.UNAUTHORIZED, "Unauthorized");

    const user = await User.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
