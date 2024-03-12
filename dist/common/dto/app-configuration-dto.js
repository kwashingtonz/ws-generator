"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigurationsDto = void 0;
class AppConfigurationsDto {
    getPort() {
        return this.port;
    }
    setPort(port) {
        this.port = port;
    }
    getIp() {
        return this.ip;
    }
    setIp(ip) {
        this.ip = ip;
    }
    getHost() {
        return this.host;
    }
    setHost(host) {
        this.host = host;
    }
    getUserName() {
        return this.userName;
    }
    setUserName(userName) {
        this.userName = userName;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getDataBase() {
        return this.dataBase;
    }
    setDataBase(dataBase) {
        this.dataBase = dataBase;
    }
    getDataBasePort() {
        return this.dataBasePort;
    }
    setDataBasePort(dataBasePort) {
        this.dataBasePort = dataBasePort;
    }
    getBeServicePath() {
        return this.beServicePath;
    }
    setBeServicePath(beServicePath) {
        this.beServicePath = beServicePath;
    }
}
exports.AppConfigurationsDto = AppConfigurationsDto;
