import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, share } from 'rxjs';
import { RoutesApi } from 'entities/route/api/routes.api';
import { Route } from 'entities/route/types/route';

/**
 * @deprecated
 */
@Injectable({ providedIn: 'root' })
export class RoutesStore {
  constructor(private routesApi: RoutesApi) {}

  public routes = this.routesApi.getRoutes().pipe(
    share({
      connector: () => new ReplaySubject(1),
      resetOnComplete: false,
    })
  );

  selectedRoutes = new BehaviorSubject<Route[]>([]);
}
