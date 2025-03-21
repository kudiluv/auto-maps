import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { map, Observable } from 'rxjs';
import { BusStation } from './types/bus-station.type';

@Injectable({ providedIn: 'root' })
export class BusStationApi {
  constructor(private apiService: ApiService) {}

  public getAll(): Observable<BusStation[]> {
    return this.apiService
      .get<BusStation[]>('/bus-stations')
      .pipe(map(({ data }) => data));
  }
}
