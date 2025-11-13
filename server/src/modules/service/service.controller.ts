import type { NextFunction, Request, Response } from "express";
import {
  createServ,
  getMyServices,
  getService,
  getServices,
} from "./service.service.js";
import { StatusCodes } from "http-status-codes";

export const createServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createServ(req);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

export const getServicesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getServices(req);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
export const getServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getService(req);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
export const getMyServicesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getMyServices(req);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
