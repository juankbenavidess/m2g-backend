export class Ticket {
  constructor(
    public id: string,
    public eventId: string,
    public userId: string,
    public quantity: number,
    public totalPrice: number,
    public status: 'confirmed',
    public purchaseDate: Date
  ) {}

  toJSON() {
    return {
      id: this.id,
      eventId: this.eventId,
      userId: this.userId,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
      status: this.status,
      purchaseDate: this.purchaseDate,
    };
  }
}