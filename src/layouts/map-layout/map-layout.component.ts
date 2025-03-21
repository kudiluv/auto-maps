import {
  Component,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { map } from 'rxjs';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { UserPositionStore } from 'entities/user/model/user-position.store';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { VehicleMarkerComponent } from 'entities/vehicle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-layout',
  templateUrl: './map-layout.component.html',
  styleUrl: './map-layout.component.scss',
  imports: [
    NgxMapboxGLModule,
    VehicleMarkerComponent,
    CommonModule,
    RouterOutlet,
  ],
  standalone: true,
})
export class MapLayoutComponent implements OnInit {
  constructor(
    public userPositionStore: UserPositionStore,
    public night: DarkModeService,
    // protected mapsService: MapsService,
    private route: ActivatedRoute,
    private _viewContainerRef: ViewContainerRef
  ) {}

  // portals$: Observable<TemplatePortal<unknown>[]> =
  //   this.mapsService._datas$.pipe(
  //     map(value =>
  //       value.map(value => new TemplatePortal(value, this._viewContainerRef))
  //     )
  //   );

  protected showFilters$ = this.route.queryParams.pipe(
    map(params => Object.keys(params).length === 0)
  );

  mapStyle$ = this.night.isDark.pipe(
    map(value =>
      value
        ? 'mapbox://styles/mapbox/navigation-night-v1'
        : 'mapbox://styles/mapbox/streets-v12'
    )
  );

  accessToken =
    'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY200aW5xbzh3MDRpNjJpcHpoazY5MzFpdCJ9.lHbcBn_S_e7vw-go05RH6w';

  zoom = 13;
  center: [number, number] = [39.70530751811469, 47.24616282214704];
  height!: number;

  ngOnInit(): void {
    this.height = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = window.innerHeight;
  }
}
