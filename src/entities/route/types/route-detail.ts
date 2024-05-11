import { LineString } from 'geojson';
import { RouteType } from 'shared/enums/route-type.enum';
import { RouteBusStation } from './route-bus-station';

export type RouteDetail = {
  id: number;
  type: RouteType;
  routeNum: string;
  ABName: string;
  BAName: string;
  ABStations: RouteBusStation[];
  BAStations: RouteBusStation[];
  AB: LineString;
  BA: LineString;
};
