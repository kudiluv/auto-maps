import { LineString } from 'geojson';
import { RouteType } from 'shared/enums/route-type.enum';

export type RoutesResponse = {
  [key: string]: Route[];
};

export type Route = {
  id: number;
  type: RouteType;
  path: LineString;
  routeNum: string;
  ABName: string;
};
