import { Injectable } from '@angular/core';
import {
  EMPTY,
  ReplaySubject,
  catchError,
  combineLatest,
  repeat,
  share,
  skip,
  switchMap,
  timer,
} from 'rxjs';
import { UserPositionStore } from '../../../entities/user/model/user-position.store';
import { Point } from 'geojson';
import { RoutesStore } from '../../../entities/route/model/routes.store';
import { VehiclePositionApi } from 'entities/vehicle';

@Injectable({ providedIn: 'root' })
export class VehiclesStore {
  constructor(
    private vehiclesApi: VehiclePositionApi,
    private userPositionStore: UserPositionStore,
    private routesStore: RoutesStore
  ) {}

  private getVehicles = (position: Point, selectedRoutes: number[]) =>
    this.vehiclesApi.getVehiclePositions(selectedRoutes, position).pipe(
      catchError(() => EMPTY.pipe(skip(1))),
      repeat({ delay: () => timer(3000) })
    );

  public vehicles = combineLatest([
    this.userPositionStore.position$,
    this.routesStore.selectedRoutes,
  ]).pipe(
    switchMap(([position, selectedRoutes]) =>
      this.getVehicles(
        position,
        [...selectedRoutes.values()].map(({ id }) => id)
      )
    ),
    share({
      connector: () => new ReplaySubject(1),
      resetOnComplete: false,
    })
  );
}
