import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { RoutePosition } from 'shared/enums/route-position.enum';
import { VehiclePosition } from 'entities/vehicle';
import { VehicleLayerComponent } from 'entities/vehicle/components/vehicles-layer/vehicle-layer.component';
import { TuiIconModule } from '@taiga-ui/experimental';
import { CommonModule } from '@angular/common';
import {
  TuiRippleModule,
  TuiSheetModule,
  TuiSheetOptions,
} from '@taiga-ui/addon-mobile';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { NounPipe } from 'shared/pipes/noun.pipe';
import { BusStopApi } from 'entities/bus-stop';
import * as _ from 'lodash';
import { RouteType } from 'shared/enums/route-type.enum';

@Component({
  selector: 'app-route-details',
  templateUrl: './bus-station-details.component.html',
  styleUrl: './bus-station-details.component.scss',
  imports: [
    VehicleLayerComponent,
    TuiIconModule,
    CommonModule,
    TuiSheetModule,
    TuiRippleModule,
    NgxMapboxGLModule,
    NounPipe,
  ],
  standalone: true,
})
export class BusStationDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busStopApi: BusStopApi,
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

  private busStopId: Observable<string> = this.route.params.pipe(
    map(params => params['busStopId'])
  );

  details$ = this.busStopId.pipe(
    switchMap(id => this.busStopApi.getBusStopDetails(id)),
    shareReplay(1)
  );

  routes$ = this.details$.pipe(
    map(busStop => {
      const groups = _.groupBy(busStop.routes, route => route.type);

      const routesGroups = Object.entries(groups);

      return routesGroups;
    })
  );

  getRoutesHeader = (type: string) => {
    return {
      [RouteType.BUS]: 'Автобусы',
      [RouteType.TRAM]: 'Трамваи',
      [RouteType.TROL]: 'Троллейбус',
      [RouteType.TRAIN]: 'Поезда',
      [RouteType.SUBURBANBUS]: 'Пригородные',
    }[type];
  };

  open$ = this.busStopId.pipe(map(value => !!value));

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
