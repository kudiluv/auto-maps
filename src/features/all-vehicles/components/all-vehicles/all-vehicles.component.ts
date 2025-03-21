import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehiclePosition } from 'entities/vehicle';
import { Router } from '@angular/router';
import {
  TuiButtonModule,
  TuiDurationOptions,
  tuiScaleIn,
} from '@taiga-ui/core';
import { TuiActiveZoneModule, tuiPure } from '@taiga-ui/cdk';
import { CommonModule } from '@angular/common';
import { ControllerModule } from 'shared/modules/controller/controller.module';
import { FilterComponent } from '../filter/filter.component';
import { VehicleLayerComponent } from 'entities/vehicle/components/vehicles-layer/vehicle-layer.component';
import { VehiclesStore } from 'features/all-vehicles/model/vehicles.store';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapDataComponent } from 'features/map/components/map-data/map-data.componet';
import { StopsStore } from 'features/bus-stations/model/stops.store';
import { IonicModule } from '@ionic/angular';
import { BusStationDetailsComponent } from 'features/bus-stations/components/bus-station-details/bus-station-details.component';
import { VehicleLayerService } from 'entities/vehicle/model/vehicle-layer.service';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrl: './all-vehicles.component.scss',
  imports: [
    CommonModule,
    ControllerModule,
    TuiActiveZoneModule,
    FilterComponent,
    VehicleLayerComponent,
    TuiButtonModule,
    NgxMapboxGLModule,
    MapDataComponent,
    BusStationDetailsComponent,
    IonicModule,
  ],
  animations: [tuiScaleIn],
})
export class AllVehiclesComponent implements OnInit, OnDestroy {
  constructor(
    protected vehiclesStore: VehiclesStore,
    protected stopsStore: StopsStore,
    private router: Router,
    private vehicleLayerService: VehicleLayerService
  ) {}

  protected vehicleLayerId = 'all-vehicles';

  ngOnInit(): void {
    this.vehicleLayerService.setCurrentVehicleLayerId(this.vehicleLayerId);
  }

  ngOnDestroy(): void {
    this.vehicleLayerService.clear();
  }

  isOpenFilters = false;

  showDetailedRoute = (vehicle: VehiclePosition) => {
    this.router.navigate([], {
      queryParams: {
        detailRouteId: vehicle.vehicle.route.id,
        routePosition: vehicle.route_position,
      },
    });
  };

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } };
  }

  toggle(value: boolean) {
    this.isOpenFilters = value;
  }
}
