import { Point } from 'geojson';

export type BusStop = {
  id: string;
  position: Point;
  name: string;
};
