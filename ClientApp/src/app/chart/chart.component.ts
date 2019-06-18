import { Component, OnInit, Input, OnChanges } from '@angular/core';
import WeatherForecast from '../../models/weatherForecast';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() weatherForecasts: WeatherForecast[];

  private chart: Chart;
  private firstLoad = true;

  ngOnInit() {
    this.initChart();
    this.firstLoad = false;
  }

  ngOnChanges() {
    if (this.firstLoad) return;
    this.updateChart();
  }

  private initChart() {
    const canvas = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');
    if (!canvas) return;
    this.chart = new Chart(canvas, {
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

  private updateChart() {
    this.chart.data.labels.length = 0;
    this.chart.data.labels = [...this.weatherForecasts.map(f => f.datetime)];

    this.chart.data.datasets.forEach(dataset => {
      dataset.data.length = 0;
      if (dataset.label === 'Max temp') {
        dataset.data = [...this.weatherForecasts.map(f => f.maxTemp)];
      }
      if (dataset.label === 'Min temp') {
        dataset.data = [...this.weatherForecasts.map(f => f.minTemp)];
      }
    });

    this.chart.update();
  }
}
