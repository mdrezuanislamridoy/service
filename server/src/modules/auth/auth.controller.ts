import type { NextFunction, Request, Response } from "express";
import { loginService } from "./auth.service.js";
import { StatusCodes } from "http-status-codes";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginService(req);
    res
      .status(StatusCodes.OK)
      .cookie("accessToken", result.accessToken, {
        httpOnly: true,
      })
      .cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
      })
      .json(result);
  } catch (error) {
    next(error);
  }
};
