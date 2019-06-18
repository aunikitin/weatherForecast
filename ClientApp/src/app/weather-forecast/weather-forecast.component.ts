import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CitiesService } from '../../services/citiesService';
import City from '../../models/city';
import { ForecastService } from '../../services/forecastService';
import WeatherForecast from '../../models/weatherForecast';

@Component({
  templateUrl: './weather-forecast.component.html',
  providers: [CitiesService, ForecastService],
})
export class WeatherForecastComponent implements OnInit {
  @ViewChild('chartTemplate') chartTemplate: TemplateRef<any>;
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  public cities: City[];
  public selectedCity: City = null;
  public weatherForecasts = new Array<WeatherForecast>();
  public currentTemplate: TemplateRef<any>;

  public loadingActions: string[] = [];
  private chartShown: boolean = false;

  constructor(private citiesService: CitiesService, private forecastService: ForecastService) {}

  ngOnInit() {
    this.loadingActions.push('LoadCities');
    this.currentTemplate = this.tableTemplate;
    this.citiesService.getAllCities().subscribe(cities => {
      this.cities = cities;
      const index = this.loadingActions.findIndex(a => a === 'LoadCities');
      this.loadingActions.splice(index, 1);
    });
  }

  public selectCity(selectedCity: City) {
    this.loadingActions.push('LoadForecasts');
    this.selectedCity = selectedCity;
    this.forecastService.getForecasts(this.selectedCity.id).subscribe(data => {
      this.weatherForecasts = [
        ...data.data.map(d => {
          return {
            datetime: d.datetime,
            minTemp: d.min_temp,
            maxTemp: d.max_temp,
          };
        }),
      ];
      const index = this.loadingActions.findIndex(a => a === 'LoadForecasts');
      this.loadingActions.splice(index, 1);
      this.loadTemplate();
    });
  }

  public showChart() {
    if (!this.chartShown) {     
      this.chartShown = true;
      this.currentTemplate = this.chartTemplate;
    }
  }

  public showTable() {
    this.chartShown = false;
    this.currentTemplate = this.tableTemplate;
  }

  public loadTemplate() {
    if (this.chartShown) {
      this.showChart();
      return;
    }
    this.showTable();
  }
}
