import { Injectable } from '@angular/core';
import { ReplaySubject, map, share } from 'rxjs';
import { Feature, FeatureCollection } from 'geojson';
import { BusStopApi } from 'entities/bus-stop';

@Injectable({ providedIn: 'root' })
export class StopsStore {
  constructor(private stopsApi: BusStopApi) {}

  public stops = this.stopsApi
    .getBusStops()
    .pipe(
      map(
        (data): FeatureCollection => ({
          type: 'FeatureCollection',
          features: data.map(
            (bus): Feature => ({
              geometry: bus.position,
              properties: {
                data: bus,
              },
              type: 'Feature',
            })
          ),
        })
      )
    )
    .pipe(
      share({
        connector: () => new ReplaySubject(1),
        resetOnComplete: false,
      })
    );
}
