import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  filter,
  map,
  repeat,
  share,
  shareReplay,
  skip,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { VehicleLayerComponent } from 'entities/vehicle/components/vehicles-layer/vehicle-layer.component';
import { TuiIconModule } from '@taiga-ui/experimental';
import { CommonModule } from '@angular/common';
import { TuiRippleModule } from '@taiga-ui/addon-mobile';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { NounPipe } from 'shared/pipes/noun.pipe';
import { BusStopApi } from 'entities/bus-stop';
import * as _ from 'lodash';
import { RouteType } from 'shared/enums/route-type.enum';
import { IonicModule } from '@ionic/angular';
import { MapDataComponent } from 'features/map/components/map-data/map-data.componet';
import { StopsStore } from 'features/bus-stations/model/stops.store';
import { VehiclePosition, VehiclePositionApi } from 'entities/vehicle';
import { VehicleLayerService } from 'entities/vehicle/model/vehicle-layer.service';

/**
 * 1. Закрытие с помощию кпомонента
 * 2. переключение по табам
 */

@Component({
    selector: 'app-bus-stations-details-modal',
    templateUrl: './bus-station-details-modal.component.html',
    styleUrl: './bus-station-details-modal.component.scss',
    imports: [
        VehicleLayerComponent,
        TuiIconModule,
        CommonModule,
        TuiRippleModule,
        NgxMapboxGLModule,
        IonicModule,
        NounPipe,
        MapDataComponent,
    ]
})
export class BusStationDetailsModalComponent {
  constructor(
    private busStopApi: BusStopApi,
    private stopsStore: StopsStore,
    protected darkMode: DarkModeService,
    private vehiclesApi: VehiclePositionApi,
    private vehicleLayerService: VehicleLayerService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('kek');
  }

  protected vehicleLayerId = 'vehicles-by-bus-station';

  async close() {
    this.stopsStore.unselectBusStop();
  }

  details$ = this.stopsStore.details$;

  routes$ = this.stopsStore.details$.pipe(
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
}
