export class Event {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public date: Date,
    public location: string,
    public price: number,
    public currency: string,
    public totalTickets: number,
    public availableTickets: number,
    public organizerName: string,
    public imageUrl?: string
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      date: this.date,
      location: this.location,
      price: this.price,
      currency: this.currency,
      totalTickets: this.totalTickets,
      availableTickets: this.availableTickets,
      organizerName: this.organizerName,
      imageUrl: this.imageUrl,
    };
  }
}