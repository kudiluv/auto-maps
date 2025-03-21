import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { VehicleLayerService } from 'entities/vehicle/model/vehicle-layer.service';
import { BusStation } from 'shared/api/bus-stations/types/bus-station.type';
import { featureCollection, point } from '@turf/helpers';
import { Feature, FeatureCollection } from 'geojson';

@Component({
  selector: 'app-bus-stations',
  templateUrl: './bus-stations.component.html',
  styleUrl: './bus-stations.component.scss',
  imports: [CommonModule, NgxMapboxGLModule],
})
export class BusStationsComponent {
  constructor(
    protected darkMode: DarkModeService,
    protected vehicleLayerService: VehicleLayerService
  ) {}

  @Input({ required: false })
  busStations: BusStation[] = [];

  @Input()
  isSelected = false;

  get busStationsFeature(): FeatureCollection {
    return featureCollection(
      this.busStations.map(
        (busStation): Feature =>
          point(busStation.coordinates, { id: busStation.id })
      )
    );
  }
  // protected onClick(
  //   e: mapboxgl.MapMouseEvent & {
  //     features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
  //   } & mapboxgl.EventData
  // ) {
  //   const props = e?.features?.[0].properties as { data: string } | undefined;
  //   if (props) {
  //     const busStop: BusStop = JSON.parse(props.data);

  //     this.stopsStore.selectBusStop(busStop.id);
  //   }
  // }
}
