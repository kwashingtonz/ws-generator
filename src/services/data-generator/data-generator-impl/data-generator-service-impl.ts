import { AxiosResponse } from "axios";
import { EnvironmentConfiguration } from "../../../configuration/environment-configuration";
import HttpMSServicePath from "../../../microservice/http-service-path";
import MicroService from "../../../microservice/micro-service";
import MicroServiceHttp from "../../../microservice/micro-service-http-impl";
import { DataGeneratorService } from "../data-generator-service";
import { CronJob } from 'cron';


const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();
const microService: MicroService = new MicroServiceHttp();

export class DataGeneratorServiceImpl implements DataGeneratorService {

  async startDataGenerator(): Promise<void> {
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
        const job = new CronJob('*/5 * * * *', () => {
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

    } catch (error) {
        throw error;
    }
    // Function to generate random weather data
    function generateWeatherData() {
      const temperature = Math.random() * (35 - 25) + 25; // Temperature between 25°C and 35°C
      const pressure = Math.random() * (1100 - 900) + 900; // Pressure between 900 hPa and 1100 hPa
      const humidity = Math.random() * (100 - 50) + 50; // Humidity between 50% and 100%
    
      return {
        temperature: temperature.toFixed(2),
        pressure: pressure.toFixed(2),
        humidity: humidity.toFixed(2)
      };
    }
    
    // Function to send weather data to the API server
    async function sendWeatherData(district:any) {
      const weatherData = generateWeatherData();
    
      try {
        
        const url = appConfig.getBeServicePath() + HttpMSServicePath.saveWeatherData;
        
        let sendingData = {
          districtId: district.id,
          districtName: district.name,
          ...weatherData
        }
    
        let response: AxiosResponse = await microService.call(url, "POST", sendingData, {
            'x-api-key': appConfig.getApiKey()
        });

        if (response.status == 200) {
            let res = response.data;
            
            if (res.status && res.status == true && res.extra) {
                console.log(`Weather data sent for ${district.name}:`, weatherData);
            }else{
                console.log(`Weather data saving not successful for ${district.name}`);
            }
        }else{
            console.error(`Error occured in sending`);
        }
    
      } catch (error) {
        console.error(`External error : `, error.message);
      }
    }
  }
  
}
  


