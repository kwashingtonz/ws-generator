import HttpException from "../http-exception";

export default class ValidationException extends HttpException {
  stackInfo: any;

  constructor(errorCode: string, errorMessage: string) {
    super(errorCode, errorMessage);
    this.stackInfo = this.stack;
  }
}
