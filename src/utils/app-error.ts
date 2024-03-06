export class AppError {
  message: string;

  constructor(message?: string) {
    if (!message) message = 'Ooops algo deu errado!';
    this.message = message;
  }
}
