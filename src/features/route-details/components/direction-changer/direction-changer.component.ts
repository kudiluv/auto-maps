import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RoutePosition } from 'shared/enums/route-position.enum';
import { VehicleLayerComponent } from 'entities/vehicle/components/vehicles-layer/vehicle-layer.component';
import { TuiIconModule } from '@taiga-ui/experimental';
import { CommonModule } from '@angular/common';
import { TuiRippleModule, TuiSheetDialogModule } from '@taiga-ui/addon-mobile';
import { RouteDetail } from 'entities/route/types/route-detail';

@Component({
  selector: 'app-direction-changer',
  templateUrl: './direction-changer.component.html',
  styleUrl: './direction-changer.component.scss',
  imports: [
    VehicleLayerComponent,
    TuiIconModule,
    CommonModule,
    TuiSheetDialogModule,
    TuiRippleModule,
  ],
  standalone: true,
})
export class DirectionChangerComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input()
  open!: boolean;

  @Output()
  openChange = new EventEmitter<boolean>();

  @Input()
  routeDetail!: RouteDetail;

  private routePosition$: Observable<RoutePosition> =
    this.route.queryParams.pipe(
      map(params => {
        const routePosition = params['routePosition'] as RoutePosition;
        if (routePosition === RoutePosition.IDLE) {
          return RoutePosition.AB;
        }
        return routePosition;
      })
    );

  public directionVariants$ = this.routePosition$.pipe(
    map(routePosition => [
      {
        from: this.routeDetail.ABStations[0].name,
        to: this.routeDetail.ABStations.at(-1)!.name,
        selected: routePosition === RoutePosition.AB,
        value: RoutePosition.AB,
      },
      {
        from: this.routeDetail.BAStations[0].name,
        to: this.routeDetail.BAStations.at(-1)!.name,
        selected: routePosition === RoutePosition.BA,
        value: RoutePosition.BA,
      },
    ])
  );

  protected changeDirection = (routeDirection: RoutePosition) => {
    const queryParams: Params = { routePosition: routeDirection };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
    this.openChange.emit(false);
  };
}
