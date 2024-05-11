import { Routes } from '@angular/router';
import { MapComponent } from '../features/map/components/map/map.component';
import { RouteDetailsComponent } from 'features/route-details';
import { AllVehiclesComponent } from 'features/all-vehicles';
import { BusStationDetailsComponent } from 'features/bus-station-details';

export const routes: Routes = [
  {
    path: 'map',
    component: MapComponent,
    children: [
      {
        path: 'route/:routeId',
        component: RouteDetailsComponent,
      },
      {
        path: 'bus/:busStopId',
        component: BusStationDetailsComponent,
      },
      {
        path: '',
        component: AllVehiclesComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full',
  },
];
