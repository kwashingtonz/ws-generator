import config from "config";
import { AppConfigurationsDto } from "../common/dto/app-configuration-dto";

export class EnvironmentConfiguration {
  readAppConfiguration(): AppConfigurationsDto {
    let appConfig: AppConfigurationsDto = new AppConfigurationsDto();
    
    let port: any = process.env.server_port;
    appConfig.setPort(port || config.get("server.port"));
    appConfig.setIp(process.env.server_ip || config.get("server.ip"));
    appConfig.setHost(process.env.db_host || config.get("db.host"));
    appConfig.setUserName(process.env.db_user_name || config.get("db.userName"));
    appConfig.setPassword(process.env.db_password || config.get("db.password"));
    appConfig.setDataBase(process.env.db_name || config.get("db.db"));
    let dataBasePort: any = process.env.db_port;
    appConfig.setDataBasePort(dataBasePort || config.get("db.port"));

    // micro service
    appConfig.setBeServicePath(process.env.ms_be || config.get("ms.be"));

    return appConfig;
  }
}
