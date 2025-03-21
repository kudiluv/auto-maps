import { Routes } from '@angular/router';
import { MapLayoutComponent } from 'layouts/map-layout/map-layout.component';
import { DefaultMapPageComponent } from 'pages/default-map-page/default-map-page.component';
export const routes: Routes = [
  {
    path: 'map',
    component: MapLayoutComponent,
    children: [
      { path: '', component: DefaultMapPageComponent },
      // { path: 'A', component: BusStationDetailsComponent },
      // {
      //   path: 'C',
      //   component: BusStationDetailsModalComponent,
      //   outlet: 'secondRouter',
      // },
      // {
      //   path: 'B',
      //   component: BusStationDetailsModalComponent,
      //   outlet: 'modal',
      // },
    ],
  },
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full',
  },
];
