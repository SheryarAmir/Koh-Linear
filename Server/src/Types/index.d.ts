import express from "express"; // 👈 this makes it a module

declare global {
  namespace Express {
    interface Request {
      user?: {
        password: string;
        email: string;
      };
    }
  }
}


