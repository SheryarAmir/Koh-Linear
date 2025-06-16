import { NextFunction, Request, Response } from "express";

export const health = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.json({ message: "server is healthy" });
};
