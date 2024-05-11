import { RoutePosition } from 'shared/enums/route-position.enum';
import { Vehicle } from './vehicle.type';
import { Point } from 'geojson';

export type VehiclePosition = {
  id: number;
  position: Point;
  speed: number;
  route_position: RoutePosition;
  vehicle: Vehicle;
  rotation: number;
  previus: VehiclePosition | null;
};
