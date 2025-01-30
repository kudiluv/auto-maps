import { Point } from 'geojson';

export type BusStop = {
  id: string;
  coordinates: Point;
  name: string;
};
