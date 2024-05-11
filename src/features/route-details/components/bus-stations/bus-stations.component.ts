import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouteBusStation } from 'entities/route/types/route-bus-station';
import { FeatureCollection } from 'geojson';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { LayerProperties } from './types/layer-properties';

@Component({
  selector: 'app-bus-stations',
  templateUrl: './bus-stations.component.html',
  standalone: true,
  imports: [NgxMapboxGLModule, CommonModule],
})
export class BusStationsComponent {
  @Input()
  public busStations: RouteBusStation[] = [];

  protected get _busStatations(): FeatureCollection {
    return {
      features: this.busStations.map(busStation => ({
        geometry: busStation.position,
        type: 'Feature',
        properties: {
          originalData: busStation,
        },
      })),
      type: 'FeatureCollection',
    };
  }

  protected onClick(
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
    } & mapboxgl.EventData
  ) {
    const props = e?.features?.[0].properties as LayerProperties | undefined;
    if (props) {
      const busStation: RouteBusStation = JSON.parse(props.originalData);
      console.log(busStation);
    }
  }
}
