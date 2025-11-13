import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

const checkRole = (...role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!role.includes(user.role)) {
      throw createHttpError(
        StatusCodes.UNAUTHORIZED,
        "You're not allowed to do this"
      );
    }

    next();
  };
};

export default checkRole
