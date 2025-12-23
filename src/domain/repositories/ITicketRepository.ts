import { Ticket } from '../entities/Ticket';

export interface ITicketRepository {
  save(ticket: Ticket): Promise<void>;
  findByUser(userId: string): Promise<Ticket[]>;
}