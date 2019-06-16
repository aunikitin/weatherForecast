import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ForecastService {
  private static appKey: string;
  private requestApiCommonPath = "https://api.weatherbit.io/v2.0/"

  public static getKey() {
    return this.appKey;
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  public getAppKey() {
    this.http.get<string>(`${this.baseUrl}api/appKey/getAppKey`).subscribe(key => (ForecastService.appKey = key));
  }

  public getForecast(cityId: number) {
    // this.get<>
  }
}
