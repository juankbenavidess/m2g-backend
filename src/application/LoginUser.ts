import { IUserRepository } from '../domain/repositories/IUserRepository';
import { PasswordService } from '../infrastructure/auth/PasswordService';
import { JWTService } from '../infrastructure/auth/JWTService';
import { UnauthorizedError } from '../shared/errors/UnauthorizedError';

export class LoginUserUseCase {
  constructor(
    private userRepo: IUserRepository,
    private passwordService: PasswordService,
    private jwtService: JWTService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isValid = await this.passwordService.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = this.jwtService.generateToken(user.id);

    return {
      user: user.toPublic(),
      token,
    };
  }
}