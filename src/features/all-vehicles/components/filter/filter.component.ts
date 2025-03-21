import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiDialogService, TuiDurationOptions } from '@taiga-ui/core';
import { TUI_PROMPT, TuiPromptModule } from '@taiga-ui/kit';
import { RoutesStore } from 'entities/route/model/routes.store';
import { VehiclesStore } from 'features/all-vehicles/model/vehicles.store';
import { map, shareReplay, switchMap, take, tap } from 'rxjs';
import { RouteType } from 'shared/enums/route-type.enum';
import { ControllerModule } from 'shared/modules/controller/controller.module';
import { GroupFilter, GroupItem } from 'shared/utils/group-filter/group-filter';
import {
  FixedSizeVirtualScrollStrategy, // choose any strategy you like
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
} from '@rx-angular/template/experimental/virtual-scrolling';
import { Route } from 'entities/route/types/route';
import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonMenu,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menu } from 'ionicons/icons';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss',
    imports: [
        RxVirtualFor,
        RxVirtualScrollViewportComponent,
        FixedSizeVirtualScrollStrategy,
        CommonModule,
        ControllerModule,
        TuiPromptModule,
        IonMenu,
        IonCheckbox,
        IonButton,
        IonIcon,
    ]
})
export class FilterComponent implements OnInit {
  constructor(
    public routesStore: RoutesStore,
    protected vehiclesStore: VehiclesStore,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {
    addIcons({ menu });
  }

  ngOnInit(): void {
    this.height = window.innerHeight;
  }

  @ViewChild('menu')
  menu!: IonMenu;

  openFilter() {
    this.menu.open();
  }

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
          this.form$.pipe(take(1)).subscribe({
            next(groupFilter) {
              groupFilter.clear();
            },
          });
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
    shareReplay(1),
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

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } };
  }
}
