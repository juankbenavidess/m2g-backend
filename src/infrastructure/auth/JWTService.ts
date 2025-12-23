import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
}

export class JWTService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';
  }

  generateToken(userId: string): string {
    const payload: JWTPayload = { userId };
    return jwt.sign(payload, this.secret, { expiresIn: '7d' });
  }

  verifyToken(token: string): JWTPayload {
    return jwt.verify(token, this.secret) as JWTPayload;
  }
}