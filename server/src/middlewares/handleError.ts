import type { NextFunction, Request, Response } from "express";

const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res
      .status(err.status || 500)
      .json({ message: err.message || "Internal server error" });
  }
};

export default handleError;
