import fs from 'fs/promises';
import path from 'path';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { Event } from '../../domain/entities/Event';

interface EventData {
  events: any[];
}

export class EventRepository implements IEventRepository {
  private filePath = path.join(__dirname, '../data/events.json');

  private async readData(): Promise<EventData> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private async writeData(data: EventData): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async findAll(): Promise<Event[]> {
    const data = await this.readData();
    return data.events.map(
      (e) =>
        new Event(
          e.id,
          e.name,
          e.description,
          new Date(e.date),
          e.location,
          e.price,
          e.currency,
          e.totalTickets,
          e.availableTickets,
          e.organizerName,
          e.imageUrl
        )
    );
  }

  async findById(id: string): Promise<Event | null> {
    const data = await this.readData();
    const eventData = data.events.find((e) => e.id === id);

    if (!eventData) return null;

    return new Event(
      eventData.id,
      eventData.name,
      eventData.description,
      new Date(eventData.date),
      eventData.location,
      eventData.price,
      eventData.currency,
      eventData.totalTickets,
      eventData.availableTickets,
      eventData.organizerName,
      eventData.imageUrl
    );
  }

  async decrementStock(eventId: string, quantity: number): Promise<void> {
    const data = await this.readData();
    const event = data.events.find((e) => e.id === eventId);

    if (event) {
      event.availableTickets -= quantity;
      await this.writeData(data);
    }
  }
}