import { IEventRepository } from '../domain/repositories/IEventRepository';

export class GetAllEventsUseCase {
  constructor(private eventRepo: IEventRepository) {}

  async execute() {
    return await this.eventRepo.findAll();
  }
}