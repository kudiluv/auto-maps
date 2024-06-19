import { Component } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  repeat,
  shareReplay,
  skip,
  switchMap,
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
  selector: 'app-bus-stations-details',
  templateUrl: './bus-station-details.component.html',
  styleUrl: './bus-station-details.component.scss',
  imports: [
    VehicleLayerComponent,
    TuiIconModule,
    CommonModule,
    TuiRippleModule,
    NgxMapboxGLModule,
    IonicModule,
    NounPipe,
    MapDataComponent,
  ],
  standalone: true,
})
export class BusStationDetailsComponent {
  constructor(
    private busStopApi: BusStopApi,
    private stopsStore: StopsStore,
    protected darkMode: DarkModeService,
    private vehiclesApi: VehiclePositionApi,
    private vehicleLayerService: VehicleLayerService
  ) {}

  protected vehicleLayerId = 'vehicles-by-bus-station';

  async close() {
    this.stopsStore.unselectBusStop();
  }

  details$ = this.stopsStore.details$;

  private repeatedQuery = (ids: number[]) => {
    return this.vehiclesApi.getVehiclePositions(ids).pipe(
      catchError(() => EMPTY.pipe(skip(1))),
      repeat({ delay: () => timer(3000) })
    );
  };

  vehicles$: Observable<VehiclePosition[]> = this.details$.pipe(
    switchMap(details =>
      this.repeatedQuery(details.routes.map(({ id }) => id))
    ),
    shareReplay(1)
  );

}
