import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors/AppError';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      statusCode: 500,
    },
  });
};