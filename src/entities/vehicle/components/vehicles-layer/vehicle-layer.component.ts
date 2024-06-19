import { Component, Input } from '@angular/core';
import { VehiclePosition } from 'entities/vehicle';
import { FeatureCollection } from 'geojson';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { CommonModule } from '@angular/common';
import { AnyLayout } from 'mapbox-gl';
import { LayerPropeties } from './types/layer-properties';

@Component({
  selector: 'app-vehicle-layer',
  templateUrl: './vehicle-layer.component.html',
  styleUrl: './vehicle-layer.component.scss',
  imports: [NgxMapboxGLModule, CommonModule],
  standalone: true,
})
export class VehicleLayerComponent {
  constructor() {}

  @Input({ required: true })
  id!: string;

  @Input()
  layout?: AnyLayout;
  protected get _layout(): AnyLayout {
    return {
      'icon-image': 'marker-{routeId}',
      'icon-rotate': ['get', 'rotation'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'text-anchor': 'center',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.25, 15, 0.5],
      ...this.layout,
    };
  }

  @Input()
  onClick?: (vehiclePosition: VehiclePosition) => void;

  protected _onClick(
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
    } & mapboxgl.EventData
  ) {
    if (!this.onClick) return;

    const props = e?.features?.[0].properties as LayerPropeties | undefined;
    if (props) {
      const vehiclePosition: VehiclePosition = JSON.parse(props.originalData);
      this.onClick(vehiclePosition);
    }
  }

  @Input()
  vehicles: VehiclePosition[] = [];

  protected get _vehicles(): FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.vehicles.map(vehiclePosition => ({
        type: 'Feature',
        geometry: vehiclePosition.position,
        properties: {
          rotation: vehiclePosition.rotation,
          type: vehiclePosition.vehicle.route.type,
          routeId: vehiclePosition.vehicle.route.id,
          routeNum: vehiclePosition.vehicle.route.routeNum,
          route_position: vehiclePosition.route_position,
          active: !(vehiclePosition.speed === 0),
          originalData: vehiclePosition,
        },
      })),
    };
  }
}
