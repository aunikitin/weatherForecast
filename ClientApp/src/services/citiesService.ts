import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import City from '../models/city';

@Injectable()
export class CitiesService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  public getAllCities() {
    return this.http.get<City[]>(`${this.baseUrl}api/cities/getAllCities`);
  }

  public getCity(id: number) {
    return this.http.get<City>(`${this.baseUrl}api/cities/getCity/${id}`);
  }
}
