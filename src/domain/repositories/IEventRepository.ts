import { Event } from '../entities/Event';

export interface IEventRepository {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  decrementStock(eventId: string, quantity: number): Promise<void>;
}