import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { StopsStore } from '../../model/stops.store';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { UserPositionStore } from 'entities/user/model/user-position.store';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  constructor(
    public stopsStore: StopsStore,
    public userPositionStore: UserPositionStore,
    public night: DarkModeService
  ) {}

  mapStyle = this.night.isDark.pipe(
    map(value =>
      value
        ? 'mapbox://styles/mapbox/navigation-night-v1'
        : 'mapbox://styles/mapbox/streets-v12'
    )
  );

  getLocation() {
    navigator.geolocation.watchPosition(pos =>
      this.userPositionStore.setPosition({
        type: 'Point',
        coordinates: [pos.coords.longitude, pos.coords.latitude],
      })
    );
  }

  isShowStops = false;
  height!: number;

  ngOnInit(): void {
    this.height = window.innerHeight;
  }

  toggleStops() {
    this.isShowStops = !this.isShowStops;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = window.innerHeight;
  }
}
