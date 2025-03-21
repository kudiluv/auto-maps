import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { BusStationApi } from 'shared/api/bus-stations/bus-stations.api';

@Injectable({
  providedIn: 'root',
})
export class BusStationsStore {
  constructor(private busStationsApi: BusStationApi) {}
  public busStations$ = this.busStationsApi.getAll().pipe(shareReplay(1));
}
