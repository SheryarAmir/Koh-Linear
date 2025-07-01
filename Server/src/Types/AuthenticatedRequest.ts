import { Request, Response } from 'express';

interface UserPayload {
  email: string;
  password: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const getProfile = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(403).json({ message: "Not authorized" });
  }

  return res.json({ email: req.user.email });
};
