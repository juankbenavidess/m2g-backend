import { Request, Response, NextFunction } from 'express';
import { GetAllEventsUseCase } from '../../application/GetAllEvents';
import { EventRepository } from '../../infrastructure/repositories/EventRepository';

export class EventsController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const eventRepo = new EventRepository();
      const useCase = new GetAllEventsUseCase(eventRepo);

      const events = await useCase.execute();

      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      next(error);
    }
  }
}