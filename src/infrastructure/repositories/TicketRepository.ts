import fs from 'fs/promises';
import path from 'path';
import { ITicketRepository } from '../../domain/repositories/ITicketRepository';
import { Ticket } from '../../domain/entities/Ticket';

interface TicketData {
  tickets: any[];
}

export class TicketRepository implements ITicketRepository {
  private filePath = path.join(__dirname, '../data/tickets.json');

  private async readData(): Promise<TicketData> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private async writeData(data: TicketData): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async save(ticket: Ticket): Promise<void> {
    const data = await this.readData();
    data.tickets.push(ticket.toJSON());
    await this.writeData(data);
  }

  async findByUser(userId: string): Promise<Ticket[]> {
    const data = await this.readData();
    return data.tickets
      .filter((t) => t.userId === userId)
      .map(
        (t) =>
          new Ticket(
            t.id,
            t.eventId,
            t.userId,
            t.quantity,
            t.totalPrice,
            t.status,
            new Date(t.purchaseDate)
          )
      );
  }
}