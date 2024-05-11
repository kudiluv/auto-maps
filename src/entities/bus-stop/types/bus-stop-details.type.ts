import { Route } from 'entities/route/types/route';
import { Point } from 'geojson';

export type BusStopDetails = {
  id: string;
  position: Point;
  name: string;
  routes: Route[];
};
