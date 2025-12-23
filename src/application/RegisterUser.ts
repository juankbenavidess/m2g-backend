import { IUserRepository } from '../domain/repositories/IUserRepository';
import { PasswordService } from '../infrastructure/auth/PasswordService';
import { JWTService } from '../infrastructure/auth/JWTService';
import { User } from '../domain/entities/User';
import { ValidationError } from '../shared/errors/ValidationError';
import { generateId } from '../shared/utils/generateId';

export class RegisterUserUseCase {
  constructor(
    private userRepo: IUserRepository,
    private passwordService: PasswordService,
    private jwtService: JWTService
  ) {}

  async execute(email: string, password: string, name: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new ValidationError('Email already exists');
    }

    const hashedPassword = await this.passwordService.hash(password);

    const user = new User(
      generateId(),
      email,
      hashedPassword,
      name,
      new Date()
    );

    await this.userRepo.save(user);

    const token = this.jwtService.generateToken(user.id);

    return {
      user: user.toPublic(),
      token,
    };
  }
}