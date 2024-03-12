export class AppConfigurationsDto {
  private port: number;
  private ip: string;
  private host: string;
  private userName: string;
  private password: string;
  private dataBase: string;
  private dataBasePort: number;
 
  //micro service
  private beServicePath: string;

  public getPort(): number {
      return this.port;
  }

  public setPort(port: number): void {
      this.port = port;
  }

  public getIp(): string {
      return this.ip;
  }

  public setIp(ip: string): void {
      this.ip = ip;
  }

  public getHost(): string {
      return this.host;
  }

  public setHost(host: string): void {
      this.host = host;
  }

  public getUserName(): string {
      return this.userName;
  }

  public setUserName(userName: string): void {
      this.userName = userName;
  }

  public getPassword(): string {
      return this.password;
  }

  public setPassword(password: string): void {
      this.password = password;
  }

  public getDataBase(): string {
      return this.dataBase;
  }

  public setDataBase(dataBase: string): void {
      this.dataBase = dataBase;
  }

  public getDataBasePort(): number {
      return this.dataBasePort;
  }

  public setDataBasePort(dataBasePort: number): void {
      this.dataBasePort = dataBasePort;
  }

  public getBeServicePath(): string {
      return this.beServicePath;
  }

  public setBeServicePath(beServicePath: string): void {
      this.beServicePath = beServicePath;
  }

}
