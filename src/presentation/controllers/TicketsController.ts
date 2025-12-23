import { Request, Response, NextFunction } from 'express';
import { PurchaseTicketUseCase } from '../../application/PurchaseTicket';
import { GetUserTicketsUseCase } from '../../application/GetUserTickets';
import { TicketRepository } from '../../infrastructure/repositories/TicketRepository';
import { EventRepository } from '../../infrastructure/repositories/EventRepository';
import { ValidationError } from '../../shared/errors/ValidationError';

export class TicketsController {
  async purchase(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, quantity } = req.body;
      const userId = req.userId!;

      if (!eventId || !quantity) {
        throw new ValidationError('EventId and quantity are required');
      }

      const ticketRepo = new TicketRepository();
      const eventRepo = new EventRepository();
      const useCase = new PurchaseTicketUseCase(ticketRepo, eventRepo);

      const ticket = await useCase.execute(userId, eventId, quantity);

      res.status(201).json({
        success: true,
        data: {
          ...ticket.toJSON(),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;

      const ticketRepo = new TicketRepository();
      const eventRepo = new EventRepository();
      const useCase = new GetUserTicketsUseCase(ticketRepo);

      const tickets = await useCase.execute(userId);

      const ticketsWithEvents = await Promise.all(
        tickets.map(async (ticket) => {
          const event = await eventRepo.findById(ticket.eventId);
          return {
            ...ticket.toJSON(),
            event: event
              ? {
                  name: event.name,
                  date: event.date,
                  location: event.location,
                }
              : null,
          };
        })
      );

      res.json({
        success: true,
        data: ticketsWithEvents,
      });
    } catch (error) {
      next(error);
    }
  }
}