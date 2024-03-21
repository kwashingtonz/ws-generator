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
exports.DataGeneratorServiceImpl = void 0;
const environment_configuration_1 = require("../../../configuration/environment-configuration");
const http_service_path_1 = __importDefault(require("../../../microservice/http-service-path"));
const micro_service_http_impl_1 = __importDefault(require("../../../microservice/micro-service-http-impl"));
const cron_1 = require("cron");
const environmentConfiguration = new environment_configuration_1.EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();
const microService = new micro_service_http_impl_1.default();
class DataGeneratorServiceImpl {
    startDataGenerator() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const districts = [
                    { id: 1, name: 'Colombo' },
                    { id: 2, name: 'Gampaha' },
                    { id: 3, name: 'Kalutara' },
                    { id: 4, name: 'Kandy' },
                    { id: 5, name: 'Matale' },
                    { id: 6, name: 'Nuwara Eliya' },
                    { id: 7, name: 'Galle' },
                    { id: 8, name: 'Matara' },
                    { id: 9, name: 'Hambantota' },
                    { id: 10, name: 'Jaffna' },
                    { id: 11, name: 'Kilinochchi' },
                    { id: 12, name: 'Mannar' },
                    { id: 13, name: 'Vavuniya' },
                    { id: 14, name: 'Mullaitivu' },
                    { id: 15, name: 'Batticaloa' },
                    { id: 16, name: 'Ampara' },
                    { id: 17, name: 'Trincomalee' },
                    { id: 18, name: 'Kurunegala' },
                    { id: 19, name: 'Puttalam' },
                    { id: 20, name: 'Anuradhapura' },
                    { id: 21, name: 'Polonnaruwa' },
                    { id: 22, name: 'Badulla' },
                    { id: 23, name: 'Monaragala' },
                    { id: 24, name: 'Ratnapura' },
                    { id: 25, name: 'Kegalle' }
                ];
                // Create cron job to send weather data every 5 minutes
                const job = new cron_1.CronJob('*/5 * * * *', () => {
                    const promises = districts.map(district => sendWeatherData(district));
                    Promise.all(promises)
                        .then(() => {
                        console.log('Weather data sent to the api for all districts.');
                    })
                        .catch(error => {
                        console.error('Internal Server Error sending weather data:', error.message);
                    });
                });
                // Start cron job
                console.log("Cron Started");
                job.start();
            }
            catch (error) {
                throw error;
            }
            // Function to generate random weather data
            function generateWeatherData() {
                const temperature = Math.random() * (35 - 25) + 25; // Temperature between 25°C and 35°C
                const pressure = Math.random() * (1100 - 900) + 900; // Pressure between 900 hPa and 1100 hPa
                const humidity = Math.random() * (100 - 50) + 50; // Humidity between 50% and 100%
                const dateTime = new Date();
                //converting to IST
                dateTime.setHours(dateTime.getHours() + 5);
                dateTime.setMinutes(dateTime.getMinutes() + 30);
                return {
                    dateTime: dateTime,
                    temperature: temperature.toFixed(2),
                    pressure: pressure.toFixed(2),
                    humidity: humidity.toFixed(2)
                };
            }
            // Function to send weather data to the API server
            function sendWeatherData(district) {
                return __awaiter(this, void 0, void 0, function* () {
                    const weatherData = generateWeatherData();
                    try {
                        const url = appConfig.getBeServicePath() + http_service_path_1.default.saveWeatherData;
                        let sendingData = Object.assign({ countryId: 1, districtId: district.id, weatherStationId: district.id }, weatherData);
                        let response = yield microService.call(url, "POST", sendingData, {
                            'x-api-key': appConfig.getApiKey()
                        });
                        if (response.status == 200) {
                            let res = response.data;
                            if (res.status && res.status == true && res.extra) {
                                console.log(`Weather data sent for ${district.name}:`, weatherData);
                            }
                            else {
                                console.log(`Weather data saving not successful for ${district.name}`);
                            }
                        }
                        else {
                            console.error(`Error occured in sending`);
                        }
                    }
                    catch (error) {
                        console.error(`External error : `, error.message);
                    }
                });
            }
        });
    }
}
exports.DataGeneratorServiceImpl = DataGeneratorServiceImpl;
