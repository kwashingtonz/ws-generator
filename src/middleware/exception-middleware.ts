import { NextFunction, Request, Response } from "express";

import { CommonResponse } from "../common/dto/common-response";
import Logger from "../configuration/log-configuration";
import ServerException from "../services/exception/exception-impl/server-exception";
import ValidationException from "../services/exception/exception-impl/validation-exception";
import HttpException from "../services/exception/http-exception";
import { CodesRes } from "../support/codes-sup";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  let cr: CommonResponse = new CommonResponse();
  let httpException: HttpException;
  if (error instanceof ValidationException) {
    cr.setExtra(error.errorMessage);
    cr.setCode(error.errorCode);
    httpException = error;
  } else {
    let exception = error.stack;
    httpException = new ServerException(CodesRes.tryCatchException, error.message,exception);
    console.log(error);
    
    cr.setExtra("Server Side Exception");
    cr.setCode(CodesRes.tryCatchException);
  }
  cr.setError(httpException);

  Logger.error(JSON.stringify(httpException));
  
  // console.log(error.stack)
  response.send(cr);
}

export default errorMiddleware;
