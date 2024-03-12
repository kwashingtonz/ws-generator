"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("../http-exception"));
class ServerException extends http_exception_1.default {
    constructor(errorCode, errorMessage, stack) {
        super(errorCode, errorMessage);
        this.stackInfo = stack;
    }
}
exports.default = ServerException;
