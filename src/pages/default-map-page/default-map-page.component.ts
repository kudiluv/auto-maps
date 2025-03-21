import { Component } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { CommonModule } from '@angular/common';
import { BusStationsComponent } from 'features/bus-stations/bus-stations.component';
import { BusStationsStore } from 'entities/bus-stations/stores/bus-stations.store';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-default-map-page',
  templateUrl: './default-map-page.component.html',
  styleUrl: './default-map-page.component.scss',
  imports: [
    NgxMapboxGLModule,
    CommonModule,
    BusStationsComponent,
    MatSidenavModule,
  ],
})
export class DefaultMapPageComponent {
  constructor(private busStationsStore: BusStationsStore) {}

  busStations$ = this.busStationsStore.busStations$;

  isOpenedFilter = false;

  toggleFilter() {
    this.isOpenedFilter = !this.isOpenedFilter;
  }
}
