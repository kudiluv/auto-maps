import { Routes } from '@angular/router';
import { MapComponent } from '../features/map/components/map/map.component';
import { BusStationDetailsComponent } from 'features/bus-stations/components/bus-station-details/bus-station-details.component';
import { AllVehiclesComponent } from 'features/all-vehicles';
import { BusStationDetailsModalComponent } from 'features/bus-stations/components/bus-station-details-modal/bus-station-details-modal.component';
export const routes: Routes = [
  {
    path: 'map',
    component: MapComponent,
    children: [
      { path: 'A', component: BusStationDetailsComponent },
      {
        path: 'C',
        component: BusStationDetailsModalComponent,
        outlet: 'secondRouter',
      },
      {
        path: 'B',
        component: BusStationDetailsModalComponent,
        outlet: 'modal',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full',
  },
];
