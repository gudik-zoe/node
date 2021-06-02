export class Error {
  statusCode!: number;
  message!: String;
  timeStamp!: String;
  data: any;

  constructor(message: String) {
    this.message = message;
  }
}
