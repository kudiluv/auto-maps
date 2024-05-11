import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BusStop } from '../types/bus-stop.type';
import { ApiService } from 'shared/api';
import { BusStopDetails } from '../types/bus-stop-details.type';

@Injectable({ providedIn: 'root' })
export class BusStopApi {
  constructor(private apiService: ApiService) {}

  public getBusStops(): Observable<BusStop[]> {
    return this.apiService
      .get<BusStop[]>('/bus-stations')
      .pipe(map(({ data }) => data));
  }

  public getBusStopDetails(id: string): Observable<BusStopDetails> {
    return this.apiService
      .get<BusStopDetails>(`/bus-stations/${id}`)
      .pipe(map(({ data }) => data));
  }
}
