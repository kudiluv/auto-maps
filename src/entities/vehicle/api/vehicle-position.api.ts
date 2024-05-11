import { Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Point } from 'geojson';
import { ApiService } from 'shared/api';
import { VehiclePosition } from '../types/vehicle-position.type';
// @ts-ignore
import * as Pbf from 'pbf';
// @ts-ignore
import * as proto from './vehicle-positions.proto.js';

@Injectable({ providedIn: 'root' })
export class VehiclePositionApi {
  constructor(private apiService: ApiService) {}

  public getVehiclePositions(
    buses: number[],
    position?: Point
  ): Observable<VehiclePosition[]> {
    return this.apiService
      .get<Uint8Array>('/vehicle-position', {
        responseType: 'arraybuffer',
        params: {
          position,
          buses,
        },
      })
      .pipe(
        map(({ data }) => data),
        map(data => {
          const pbf = new Pbf(data);
          return proto.VehiclePositionResponse.read(pbf).vehiclePositions;
        })
      );
  }
}
