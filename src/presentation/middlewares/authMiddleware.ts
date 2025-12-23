import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../infrastructure/auth/JWTService';
import { UnauthorizedError } from '../../shared/errors/UnauthorizedError';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    const jwtService = new JWTService();
    const { userId } = jwtService.verifyToken(token);

    req.userId = userId;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};