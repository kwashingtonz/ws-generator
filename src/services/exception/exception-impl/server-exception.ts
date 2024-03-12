import HttpException from "../http-exception";

export default class ServerException extends HttpException{
    stackInfo: any;

    constructor(errorCode: string, errorMessage: string,stack:any) {
      super(errorCode, errorMessage);
      this.stackInfo = stack;
    }
}