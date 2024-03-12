"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_response_1 = require("../common/dto/common-response");
const log_configuration_1 = __importDefault(require("../configuration/log-configuration"));
const server_exception_1 = __importDefault(require("../services/exception/exception-impl/server-exception"));
const validation_exception_1 = __importDefault(require("../services/exception/exception-impl/validation-exception"));
const codes_sup_1 = require("../support/codes-sup");
function errorMiddleware(error, request, response, next) {
    let cr = new common_response_1.CommonResponse();
    let httpException;
    if (error instanceof validation_exception_1.default) {
        cr.setExtra(error.errorMessage);
        cr.setCode(error.errorCode);
        httpException = error;
    }
    else {
        let exception = error.stack;
        httpException = new server_exception_1.default(codes_sup_1.CodesRes.tryCatchException, error.message, exception);
        console.log(error);
        cr.setExtra("Server Side Exception");
        cr.setCode(codes_sup_1.CodesRes.tryCatchException);
    }
    cr.setError(httpException);
    log_configuration_1.default.error(JSON.stringify(httpException));
    // console.log(error.stack)
    response.send(cr);
}
exports.default = errorMiddleware;
