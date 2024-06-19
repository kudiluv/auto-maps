import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { RouterOutlet } from '@angular/router';
import { TuiRippleModule, TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiModeModule,
  TuiScrollbarModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import {
  TuiCellModule,
  TuiIconModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';
import { CommonModule, NgStyle } from '@angular/common';
import { StopsStore } from '../bus-stations/model/stops.store';
import { ApiModule } from '../../shared/api/api.module';
import { TuiBadgeModule, TuiRadioModule, TuiTagModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiclesStore } from '../all-vehicles/model/vehicles.store';
import { UserPositionStore } from '../../entities/user/model/user-position.store';
import { RoutesStore } from '../../entities/route/model/routes.store';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { VehicleMarkerComponent } from 'entities/vehicle';
import { VehicleLayerComponent } from 'entities/vehicle/components/vehicles-layer/vehicle-layer.component';
import { ControllerModule } from 'shared/modules/controller/controller.module';
import { BusStationsComponent } from 'features/bus-stations';
import { AllVehiclesComponent } from 'features/all-vehicles';
import { FilterComponent } from 'features/all-vehicles/components/filter/filter.component';
import { IonicModule } from '@ionic/angular';
import { BusStationDetailsComponent } from 'features/bus-stations/components/bus-station-details/bus-station-details.component';
import { PortalModule } from '@angular/cdk/portal';
import { ThreeDimensionalLayerComponent } from './components/3d-layer/three-demencional-layer.component';

@NgModule({
  declarations: [MapComponent],
  imports: [
    BusStationsComponent,
    ControllerModule,
    VehicleLayerComponent,
    TuiRadioModule,
    RouterOutlet,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiButtonModule,
    TuiIconModule,
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    TuiCellModule,
    TuiBadgeModule,
    NgStyle,
    TuiTagModule,
    TuiScrollbarModule,
    TuiTitleModule,
    TuiThemeNightModule,
    TuiModeModule,
    BusStationDetailsComponent,
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg',
    }),
    TuiRippleModule,
    VehicleMarkerComponent,
    AllVehiclesComponent,
    FilterComponent,
    IonicModule,
    PortalModule,
    ThreeDimensionalLayerComponent,
  ],
  providers: [StopsStore, VehiclesStore, UserPositionStore, RoutesStore],
  exports: [MapComponent],
})
export class MapModule {}
