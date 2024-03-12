export default abstract class HttpException extends Error {
  errorCode: string;
  errorMessage: string;
  exception: any;

  constructor(errorCode: string, errorMessage: string) {
    super();
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    
  }
}
