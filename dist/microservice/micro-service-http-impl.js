"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
/**
 * handle micro service http request
 */
class MicroServiceHttp {
    /**
     * send http call for micro service
     * @param {string} path
     * @param {Method} method
     * @param {any} data
     * @param {any} headers
     * @return {any} return axios response..completely object will be return..not handling 404 or any status code..
     */
    call(path, method, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            // send axios call
            const response = yield (0, axios_1.default)({ url: path, data: data, headers: headers, method: method });
            // return response
            return response;
        });
    }
}
exports.default = MicroServiceHttp;
