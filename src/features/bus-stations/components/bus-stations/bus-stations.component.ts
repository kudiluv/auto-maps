import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { BusStop } from 'entities/bus-stop';
import { IonicModule } from '@ionic/angular';
import { MapDataComponent } from 'features/map/components/map-data/map-data.componet';
import { StopsStore } from 'features/bus-stations/model/stops.store';
import { BusStationDetailsComponent } from '../bus-station-details/bus-station-details.component';
import { VehicleLayerService } from 'entities/vehicle/model/vehicle-layer.service';

@Component({
  selector: 'app-bus-stations',
  templateUrl: './bus-stations.component.html',
  styleUrl: './bus-stations.component.scss',
  imports: [
    CommonModule,
    NgxMapboxGLModule,
    IonicModule,
    MapDataComponent,
    BusStationDetailsComponent,
  ],
  standalone: true,
})
export class BusStationsComponent {
  constructor(
    protected stopsStore: StopsStore,
    protected darkMode: DarkModeService,
    protected vehicleLayerService: VehicleLayerService
  ) {}

  protected selectedBusStation$ = this.stopsStore.selectedBusStopId$;

  protected onClick(
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
    } & mapboxgl.EventData
  ) {
    const props = e?.features?.[0].properties as { data: string } | undefined;
    if (props) {
      const busStop: BusStop = JSON.parse(props.data);

      this.stopsStore.selectBusStop(busStop.id);
    }
  }
}
