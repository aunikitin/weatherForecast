import { Component, Input } from '@angular/core';
import WeatherForecast from '../../models/weatherForecast';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent {
  @Input() loadingActions: string[];
  @Input() weatherForecasts: WeatherForecast[];
}
