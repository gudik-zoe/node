export class Error {
  statusCode!: number;
  message!: String;
  timeStamp!: String;

  constructor(message: String) {
    this.message = message;
  }
}
