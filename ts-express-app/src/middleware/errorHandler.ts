import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
};

export default errorHandler;
