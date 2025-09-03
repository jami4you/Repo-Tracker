import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token received:', token); // ✅ Add this line
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('Decoded JWT:', decoded); // ✅ Add this line
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
