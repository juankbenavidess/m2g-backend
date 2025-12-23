import { ITicketRepository } from '../domain/repositories/ITicketRepository';
import { IEventRepository } from '../domain/repositories/IEventRepository';
import { Ticket } from '../domain/entities/Ticket';
import { NotFoundError } from '../shared/errors/NotFoundError';
import { ValidationError } from '../shared/errors/ValidationError';
import { generateId } from '../shared/utils/generateId';

export class PurchaseTicketUseCase {
  constructor(
    private ticketRepo: ITicketRepository,
    private eventRepo: IEventRepository
  ) {}

  async execute(userId: string, eventId: string, quantity: number) {
    const event = await this.eventRepo.findById(eventId);
    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.availableTickets < quantity) {
      throw new ValidationError(
        `Only ${event.availableTickets} tickets available`
      );
    }

    if (quantity <= 0 || quantity > 10) {
      throw new ValidationError('Quantity must be between 1 and 10');
    }

    const ticket = new Ticket(
      generateId(),
      eventId,
      userId,
      quantity,
      event.price * quantity,
      'confirmed',
      new Date()
    );

    await this.ticketRepo.save(ticket);
    await this.eventRepo.decrementStock(eventId, quantity);

    return ticket;
  }
}