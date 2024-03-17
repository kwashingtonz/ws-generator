import config from "config";
import express, { Request, Response, Router } from "express";
import * as http from "http";
import { AppConfigurationsDto } from "../common/dto/app-configuration-dto";
import { EnvironmentConfiguration } from "../configuration/environment-configuration";
import morganMiddleware from "../configuration/http-log-configuration";
import cors from "cors";
import errorHandlerMiddleware from "../middleware/exception-middleware";
import fs from "fs";
import { DataGeneratorServiceImpl } from "../services/data-generator/data-generator-impl/data-generator-service-impl";
import { DataGeneratorService } from "../services/data-generator/data-generator-service";

/**
 * main application configuration
 * set up db , loggers , cors and etc
 * @param constructor
 */
export function NodeApplication<T extends { new(...args: any[]): {} }>(constructor: T) {
  const app = express();
  app.use(cors());
  app.use(morganMiddleware);
  app.use(express.json({ limit: "50mb" }));

  const server: http.Server = http.createServer(app);

  // configuration read from system environment
  let appConfigurationDto: AppConfigurationsDto = readAppConfiguration();
  const port: Number = appConfigurationDto.getPort();

  // error handler middleware
  app.use(errorHandlerMiddleware);

  // start server
  app.listen(port);

  // call prototype method
  constructor.prototype.run(port);
  
  //starting data generator
  startDataGenerator();
}

export function readAppConfiguration(): AppConfigurationsDto {
  let configurationReader: EnvironmentConfiguration = new EnvironmentConfiguration();
  let appConfigurationDto: AppConfigurationsDto = configurationReader.readAppConfiguration();
  return appConfigurationDto;
}

export function startDataGenerator(): void {
  let dataGen: DataGeneratorService = new DataGeneratorServiceImpl()
  dataGen.startDataGenerator();
}