import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../services/forecastService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ForecastService],
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private forecastService: ForecastService) {}

  ngOnInit() {
    this.forecastService.getAppKey();
  }
}
