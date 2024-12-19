import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export default logger;
