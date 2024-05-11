import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { TuiRippleModule, TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { tuiPure } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDialogService,
  TuiDurationOptions,
  TuiPrimitiveCheckboxModule,
  tuiScaleIn,
} from '@taiga-ui/core';
import { TUI_PROMPT, TuiPromptModule } from '@taiga-ui/kit';
import { RoutesStore } from 'entities/route/model/routes.store';
import { VehiclesStore } from 'features/all-vehicles/model/vehicles.store';
import { map, switchMap, tap } from 'rxjs';
import { RouteType } from 'shared/enums/route-type.enum';
import { ControllerModule } from 'shared/modules/controller/controller.module';
import { GroupFilter, GroupItem } from 'shared/utils/group-filter/group-filter';
import {
  FixedSizeVirtualScrollStrategy, // choose any strategy you like
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
} from '@rx-angular/template/experimental/virtual-scrolling';
import { Route } from 'entities/route/types/route';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  standalone: true,
  imports: [
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    FixedSizeVirtualScrollStrategy,
    TuiPrimitiveCheckboxModule,
    CommonModule,
    ScrollingModule,
    TuiSidebarModule,
    ControllerModule,
    TuiButtonModule,
    TuiPromptModule,
    TuiRippleModule,
  ],
  animations: [tuiScaleIn],
})
export class FilterComponent implements OnInit {
  constructor(
    public routesStore: RoutesStore,
    protected vehiclesStore: VehiclesStore,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  @Input()
  public open!: boolean;

  protected isEmptyBusesPositions$ = this.vehiclesStore.vehicles.pipe(
    map(positions => positions.length === 0)
  );

  protected promptClearFilter = () => {
    this.dialogs
      .open<boolean>(TUI_PROMPT, {
        label: 'Сбросить фильтер?',
        data: {
          content: 'Не удалось найти транспорт по заданному фильтру',
          yes: 'Да',
          no: 'Нет',
        },
      })
      .subscribe(response => {
        if (response) {
          this.routesStore.selectedRoutes.next([]);
        }
      });
  };

  form$ = this.routesStore.routes.pipe(
    switchMap(all => {
      const selectedRoutes = this.routesStore.selectedRoutes.value.length
        ? this.routesStore.selectedRoutes.value
        : all;
      return new GroupFilter(all, selectedRoutes, 'type').asObservale();
    }),
    tap(groupFilter => {
      if (groupFilter.isAll) {
        return this.routesStore.selectedRoutes.next([]);
      }
      this.routesStore.selectedRoutes.next(groupFilter.selectedValues);
    })
  );

  trackBy(index: number, item: GroupItem<'type', Route>) {
    const type = item.type;
    if (type === 'item') {
      return type + item.data.id;
    }
    return type;
  }

  protected groupToName = (type: RouteType) => {
    switch (type) {
      case RouteType.TROL:
        return 'Троллейбусы';
      case RouteType.TRAM:
        return 'Трамваи';
      case RouteType.SUBURBANBUS:
        return 'Пригородные';
      case RouteType.TRAIN:
        return 'Поезда';
      case RouteType.BUS:
        return 'Автобусы';
    }
  };

  protected itemToName = (type: RouteType) => {
    switch (type) {
      case RouteType.TROL:
        return 'Троллейбус';
      case RouteType.TRAM:
        return 'Трамвай';
      case RouteType.SUBURBANBUS:
        return 'Пригородный';
      case RouteType.TRAIN:
        return 'Поезд';
      case RouteType.BUS:
        return 'Автобус';
    }
  };

  height!: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = window.innerHeight;
  }

  ngOnInit(): void {
    this.height = window.innerHeight;
  }

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } };
  }

  badgeHandler = () => NaN;
}
