import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../services/citiesService';
import City from '../../models/city';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  providers: [CitiesService],
})
export class FetchDataComponent implements OnInit {
  public cities: City[];
  public selectedCity: City = null;

  constructor(private citiesService: CitiesService) {}

  ngOnInit() {
    this.citiesService.getAllCities().subscribe(cities => (this.cities = cities));
  }

  public selectCity(selectedCity: City) {
    this.selectedCity = selectedCity;
  }
}
