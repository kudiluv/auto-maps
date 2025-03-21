import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { RoutesApi } from 'shared/api/routes/routes.api';

@Injectable({ providedIn: 'root' })
export class RoutesStore {
  constructor(private routesApi: RoutesApi) {}

  public routes = this.routesApi.getAll().pipe(shareReplay(1));
}
