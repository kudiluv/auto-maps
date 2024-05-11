import { Component } from '@angular/core';
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
import { StopsStore } from 'features/map/model/stops.store';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BusStop } from 'entities/bus-stop';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrl: './all-vehicles.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ControllerModule,
    TuiActiveZoneModule,
    FilterComponent,
    VehicleLayerComponent,
    TuiButtonModule,
    NgxMapboxGLModule,
  ],
  animations: [tuiScaleIn],
})
export class AllVehiclesComponent {
  constructor(
    protected vehiclesStore: VehiclesStore,
    protected stopsStore: StopsStore,
    private router: Router
  ) {}

  isOpenFilters = false;

  showDetailedRoute = (vehicle: VehiclePosition) => {
    this.router.navigate([`map/route/${vehicle.vehicle.route.id}`], {
      queryParams: {
        routePosition: vehicle.route_position,
      },
    });
  };

  protected _onClick(
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
    } & mapboxgl.EventData
  ) {
    const props = e?.features?.[0].properties as { data: string } | undefined;
    if (props) {
      const busStop: BusStop = JSON.parse(props.data);

      this.router.navigate([`map/bus/${busStop.id}`]);
    }
  }

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } };
  }

  toggle(value: boolean) {
    this.isOpenFilters = value;
  }
}
