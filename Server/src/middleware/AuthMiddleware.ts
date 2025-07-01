
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface user {
  
  email:string,
  password:string
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction) => {



  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

  const token = req.cookies?.accessToken;

  console.log(`Token: ${token}`);
    console.log({JWT_SECRET})

  if (!token) {
     res.status(401).json({ message: 'Access token missing' });
  }

  try {


    const decoded = jwt.verify(token, JWT_SECRET);
     req.user = decoded as user;
    next();
    
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
