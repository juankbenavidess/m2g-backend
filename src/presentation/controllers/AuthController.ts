import { Request, Response, NextFunction } from 'express';
import { LoginUserUseCase } from '../../application/LoginUser';
import { RegisterUserUseCase } from '../../application/RegisterUser';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { PasswordService } from '../../infrastructure/auth/PasswordService';
import { JWTService } from '../../infrastructure/auth/JWTService';
import { ValidationError } from '../../shared/errors/ValidationError';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ValidationError('Email and password are required');
      }

      const userRepo = new UserRepository();
      const passwordService = new PasswordService();
      const jwtService = new JWTService();
      const useCase = new LoginUserUseCase(
        userRepo,
        passwordService,
        jwtService
      );

      const result = await useCase.execute(email, password);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        throw new ValidationError('Email, password and name are required');
      }

      const userRepo = new UserRepository();
      const passwordService = new PasswordService();
      const jwtService = new JWTService();
      const useCase = new RegisterUserUseCase(
        userRepo,
        passwordService,
        jwtService
      );

      const result = await useCase.execute(email, password, name);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}