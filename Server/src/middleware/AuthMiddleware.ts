import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 👇 Define your expected user structure
interface UserPayload {
  email: string;
  id: string;
}

// 👇 Extend Express.Request locally
interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
  const token = req.cookies?.accessToken;

  console.log(`you middleware is working ${token}`)
  if (!token) {
   res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

    // 👇 Add user to the request safely
    req.user = decoded;

    next();
  } catch (err) {

    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
