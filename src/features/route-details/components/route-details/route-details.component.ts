import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  EMPTY,
  Observable,
  ReplaySubject,
  catchError,
  combineLatest,
  map,
  repeat,
  share,
  skip,
  switchMap,
  timer,
} from 'rxjs';
import { RoutesApi } from 'entities/route/api/routes.api';
import { RoutePosition } from 'shared/enums/route-position.enum';
import { RouteType } from 'shared/enums/route-type.enum';
import { VehiclePosition, VehiclePositionApi } from 'entities/vehicle';
import { VehicleLayerComponent } from 'entities/vehicle/components/vehicles-layer/vehicle-layer.component';
import { TuiIconModule } from '@taiga-ui/experimental';
import { CommonModule } from '@angular/common';
import {
  TuiRippleModule,
  TuiSheetModule,
  TuiSheetOptions,
} from '@taiga-ui/addon-mobile';
import { DirectionChangerComponent } from '../direction-changer/direction-changer.component';
import { Feature } from 'geojson';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BusStationsComponent } from '../bus-stations/bus-stations.component';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { NounPipe } from 'shared/pipes/noun.pipe';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrl: './route-details.component.scss',
  imports: [
    VehicleLayerComponent,
    TuiIconModule,
    CommonModule,
    TuiSheetModule,
    TuiRippleModule,
    DirectionChangerComponent,
    NgxMapboxGLModule,
    BusStationsComponent,
    NounPipe,
  ],
  standalone: true,
})
export class RouteDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routesApi: RoutesApi,
    private vehiclesApi: VehiclePositionApi,
    protected darkMode: DarkModeService
  ) {}

  open = true;

  onOpenChange() {
    this.router.navigate(['map']);
  }

  readonly options: Partial<TuiSheetOptions> = {
    stops: ['4rem'],
    initial: 0,
  };

  private routeId$: Observable<string> = this.route.params.pipe(
    map(params => params['routeId'])
  );

  private repeatedQuery = (id: number) => {
    return this.vehiclesApi.getVehiclePositions([id]).pipe(
      catchError(() => EMPTY.pipe(skip(1))),
      repeat({ delay: () => timer(3000) })
    );
  };

  vehicles$: Observable<VehiclePosition[]> = this.routeId$.pipe(
    switchMap(id => this.repeatedQuery(Number(id))),
    share({
      connector: () => new ReplaySubject(1),
      resetOnComplete: false,
    })
  );

  private routePosition$: Observable<RoutePosition> =
    this.route.queryParams.pipe(
      map(params => {
        const routePosition = params['routePosition'] as RoutePosition;
        if (routePosition === RoutePosition.IDLE) {
          return RoutePosition.AB;
        }
        return routePosition;
      })
    );

  protected routeDetailsFromApi$ = this.routeId$.pipe(
    switchMap(id => this.routesApi.getRouteDetails(id)),
    share({
      connector: () => new ReplaySubject(1),
      resetOnComplete: false,
    })
  );

  public routeDetails$ = combineLatest([
    this.routePosition$,
    this.routeDetailsFromApi$,
  ]).pipe(
    map(([routePosition, routeDetails]) => ({
      type: routeDetails.type,
      routeNum: routeDetails.routeNum,
      name:
        routePosition === RoutePosition.AB
          ? routeDetails.ABName
          : routeDetails.BAName,
      stations:
        routePosition === RoutePosition.AB
          ? routeDetails.ABStations
          : routeDetails.BAStations,
      routePath:
        routePosition === RoutePosition.AB ? routeDetails.AB : routeDetails.BA,
    }))
  );

  protected routePath$: Observable<Feature> = combineLatest([
    this.routePosition$,
    this.routeDetailsFromApi$,
  ]).pipe(
    map(([routePosition, routeDetails]) => {
      return {
        geometry:
          routePosition === RoutePosition.AB
            ? routeDetails.AB
            : routeDetails.BA,
        properties: {},
        type: 'Feature',
      };
    })
  );

  protected routeBusStations$ = combineLatest([
    this.routePosition$,
    this.routeDetailsFromApi$,
  ]).pipe(
    map(([routePosition, routeDetails]) => {
      return routePosition === RoutePosition.AB
        ? routeDetails.ABStations
        : routeDetails.BAStations;
    })
  );

  public routeTypeHuman$ = this.routeDetailsFromApi$.pipe(
    map(({ type }) => {
      return {
        [RouteType.BUS]: 'Автобус',
        [RouteType.TROL]: 'Троллейбус',
        [RouteType.TRAM]: 'Трамвай',
        [RouteType.SUBURBANBUS]: 'Троллейбус',
        [RouteType.TRAIN]: 'Поезд',
      }[type];
    })
  );

  open$ = this.routeId$.pipe(map(value => !!value));

  isOpenChangeDirection = false;

  hide() {
    this.router.navigate(['']);
  }

  protected onClickBus = (vehicle: VehiclePosition) => {
    this.changeDirection(vehicle.route_position);
  };

  protected changeDirection = (routeDirection: RoutePosition) => {
    const queryParams: Params = { routePosition: routeDirection };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  };
}
