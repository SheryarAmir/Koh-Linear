import { NextFunction, Request, Response } from "express";

export const login = (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "login" });
};

export const register = (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "register" });
};