import type { NextFunction, Request, Response } from "express";
import { create, get } from "./user.service.js";
import { StatusCodes } from "http-status-codes";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await create(req);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

export const profileData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await get(req);
    
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(StatusCodes.OK)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        success: true,
        message: "Logout Success",
      });
  } catch (error) {
    next(error);
  }
};
