import type { Request } from "express";
import { Service } from "./service.model.js";
import { User } from "../user/user.model.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

export const createServ = async (req: Request) => {
  const { name, description, category, location } = req.body;

  const userId = req.user.id;

  const service = await Service.create({
    providerId: userId,
    name,
    description,
    category,
    location,
  });

  return {
    success: true,
    message: "Service created successfully",
    service,
  };
};
export const getServices = async (req: Request) => {
  const services = await Service.find();
  if (services.length === 0) {
    throw createHttpError(StatusCodes.NOT_FOUND, "No service found");
  }
  return {
    success: true,
    message: "Services fetched successfully",
    services,
  };
};
export const getService = async (req: Request) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  if (!service) {
    throw createHttpError(StatusCodes.NOT_FOUND, "Service not found");
  }
  return {
    success: true,
    message: "Service fetched successfully",
    service,
  };
};
export const getMyServices = async (req: Request) => {
  const services = await Service.find({ providerId: req.user.id });

  if (services.length === 0) {
    throw createHttpError(StatusCodes.NOT_FOUND, "No service found");
  }
  return {
    success: true,
    message: "Services fetched successfully",
    services,
  };
};
