import { ITicketRepository } from '../domain/repositories/ITicketRepository';

export class GetUserTicketsUseCase {
  constructor(private ticketRepo: ITicketRepository) {}

  async execute(userId: string) {
    return await this.ticketRepo.findByUser(userId);
  }
}