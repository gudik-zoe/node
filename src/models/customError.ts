export class CustomeError {
  status!: number;
  message!: String;
  timeStamp!: Date;
  data: any;

  constructor(message: String, status: number, timeStamp: Date, data: any) {
    this.message = message;
    this.status = status;
    this.timeStamp = timeStamp;
    this.data = data;
  }
}
