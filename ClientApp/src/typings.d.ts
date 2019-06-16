/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
