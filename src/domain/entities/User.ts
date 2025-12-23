export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string,
    public createdAt: Date
  ) {}

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      createdAt: this.createdAt,
    };
  }

  toPublic() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    };
  }
}