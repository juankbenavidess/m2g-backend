import fs from 'fs/promises';
import path from 'path';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

interface UserData {
  users: any[];
}

export class UserRepository implements IUserRepository {
  private filePath = path.join(__dirname, '../data/users.json');

  private async readData(): Promise<UserData> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private async writeData(data: UserData): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.readData();
    const userData = data.users.find((u) => u.email === email);

    if (!userData) return null;

    return new User(
      userData.id,
      userData.email,
      userData.password,
      userData.name,
      new Date(userData.createdAt)
    );
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.readData();
    const userData = data.users.find((u) => u.id === id);

    if (!userData) return null;

    return new User(
      userData.id,
      userData.email,
      userData.password,
      userData.name,
      new Date(userData.createdAt)
    );
  }

  async save(user: User): Promise<void> {
    const data = await this.readData();

    const existingIndex = data.users.findIndex((u) => u.id === user.id);

    if (existingIndex >= 0) {
      data.users[existingIndex] = user.toJSON();
    } else {
      data.users.push(user.toJSON());
    }

    await this.writeData(data);
  }
}