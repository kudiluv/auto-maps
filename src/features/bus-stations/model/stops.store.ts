import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  filter,
  map,
  share,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Feature, FeatureCollection } from 'geojson';
import { BusStopApi } from 'entities/bus-stop';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StopsStore {
  constructor(
    private stopsApi: BusStopApi,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public selectedBusStopId$: Observable<string | null> = this.route.params.pipe(
    map(params => params['id'] ?? null)
  );

  public details$ = this.selectedBusStopId$.pipe(
    filter(value => !!value),
    switchMap(id => this.stopsApi.getBusStopDetails(id!)),
    shareReplay(1)
  );

  public selectBusStop(id: string) {
    this.router.navigate([
      `/map/bus-stations/${id}`])
  }

  public unselectBusStop() {
    this.router.navigate([{}]);
  }

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
                id: bus.id,
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
