import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ForecastService {
  private static appKey: string;
  private requestApiCommonPath = 'https://api.weatherbit.io/v2.0/';

  public static getKey() {
    return this.appKey;
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  public getAppKey() {
    this.http.get<{ key: string }>(`${this.baseUrl}api/appKey/getAppKey`).subscribe(keyObj => {
      ForecastService.appKey = keyObj.key;
    });
  }

  public getForecasts(cityId: number) {
    let params = new HttpParams();
    params = params.append('key', ForecastService.appKey);
    params = params.append('city_id', cityId.toString());
    let requestApi = `${this.requestApiCommonPath}forecast/daily`;
    return this.http.get<{ data: { datetime: string; min_temp: number; max_temp: number }[] }>(requestApi, { params });
  }
}
