import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CitiesService } from '../../services/citiesService';
import City from '../../models/city';
import { ForecastService } from '../../services/forecastService';
import WeatherForecast from '../../models/weatherForecast';
import { Chart } from 'chart.js';

@Component({
  templateUrl: './weatherForecast.component.html',
  providers: [CitiesService, ForecastService],
})
export class FetchDataComponent implements OnInit {
  @ViewChild('chartTemplate') chartTemplate: TemplateRef<any>;
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  public cities: City[];
  public selectedCity: City = null;
  public weatherForecasts = new Array<WeatherForecast>();
  public currentTemplate: TemplateRef<any>;

  public counter = 0;

  public hasLoadingData = false;
  private _chartShown: boolean = false;
  get chartShown(): boolean {
    return this._chartShown;
  }
  set chartShown(theBar: boolean) {
    this._chartShown = theBar;
  }

  constructor(private citiesService: CitiesService, private forecastService: ForecastService) {}

  ngOnInit() {
    this.hasLoadingData = true;
    this.currentTemplate = this.tableTemplate;
    this.citiesService.getAllCities().subscribe(cities => {
      this.cities = cities;
      this.hasLoadingData = false;
    });
  }

  public selectCity(selectedCity: City) {
    this.hasLoadingData = true;
    this.selectedCity = selectedCity;
    this.weatherForecasts.length = 0;
    this.forecastService.getForecasts(this.selectedCity.id).subscribe(data => {
      this.hasLoadingData = false;
      this.weatherForecasts = [
        ...data.data.map(d => {
          return {
            datetime: d.datetime,
            minTemp: d.min_temp,
            maxTemp: d.max_temp,
          };
        }),
      ];
      this.loadTemplate();
    });
  }

  public showChart() {
    if (!this.chartShown) {     
      this.chartShown = true;
      this.currentTemplate = this.chartTemplate;
    }
    this.loadChartAfterTempRender();
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

  private loadChartAfterTempRender() {
    // should load after template render :(
    setTimeout(this.initChart.bind(this), 500);
  }

  private initChart() {
    const canvas = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');
    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [...this.weatherForecasts.map(f => f.datetime)],
        datasets: [
          {
            label: 'Max temp',
            borderColor: 'red',
            data: [...this.weatherForecasts.map(f => f.maxTemp)],
          },
          {
            label: 'Min temp',
            borderColor: 'blue',
            data: [...this.weatherForecasts.map(f => f.minTemp)],
          },
        ],
      },
    });
  }
}
