import {
  Component,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { StopsStore } from '../../../bus-stations/model/stops.store';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { UserPositionStore } from 'entities/user/model/user-position.store';
import { MapsService } from 'features/map/model/maps.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  standalone: false,
})
export class MapComponent implements OnInit {
  constructor(
    public stopsStore: StopsStore,
    public userPositionStore: UserPositionStore,
    public night: DarkModeService,
    protected mapsService: MapsService,
    private router: Router,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private _viewContainerRef: ViewContainerRef
  ) {}

  portals$: Observable<TemplatePortal<unknown>[]> =
    this.mapsService._datas$.pipe(
      map(value =>
        value.map(value => new TemplatePortal(value, this._viewContainerRef))
      )
    );

  ngAfterViewInit() {
    console.log(this.mapsService._datas$.value);
  }

  protected showFilters$ = this.route.queryParams.pipe(
    map(params => Object.keys(params).length === 0)
  );

  mapStyle = this.night.isDark.pipe(
    map(value =>
      value
        ? 'mapbox://styles/mapbox/navigation-night-v1'
        : 'mapbox://styles/mapbox/streets-v12'
    )
  );

  protected showBusStop$: Observable<boolean> = this.route.queryParams.pipe(
    map(params => !!params['bus-stop-id'])
  );

  protected detailRouteId$: Observable<string> = this.route.queryParams.pipe(
    map(params => params['detailRouteId'])
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
