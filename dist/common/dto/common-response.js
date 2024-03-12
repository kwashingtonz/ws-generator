"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonResponse = void 0;
class CommonResponse {
    constructor() {
        // failed or success
        this.status = false;
        // response code
        this.code = "";
        // data object or error msg
        this.extra = "";
        this.count = 0;
    }
    getError() {
        return this.error;
    }
    setError(error) {
        this.error = error;
    }
    getCount() {
        return this.count;
    }
    setCount(count) {
        this.count = count;
    }
    isStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getCode() {
        return this.code;
    }
    setCode(code) {
        this.code = code;
    }
    getExtra() {
        return this.extra;
    }
    setExtra(extra) {
        this.extra = extra;
    }
}
exports.CommonResponse = CommonResponse;
