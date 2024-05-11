import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service';
import { map } from 'rxjs';
import { Route } from '../types/route';
import { RouteDetail } from '../types/route-detail';

@Injectable({ providedIn: 'root' })
export class RoutesApi {
  constructor(private apiService: ApiService) {}

  getRoute = (id: number) =>
    this.apiService
      .get<string>(`/routes/${id}`, { responseType: 'text' })
      .pipe(map(({ data }) => data));

  getRoutes = () =>
    this.apiService.get<Route[]>('/routes').pipe(map(({ data }) => data));

  getRouteDetails = (id: string) =>
    this.apiService
      .get<RouteDetail>(`/routes/${id}/detail`)
      .pipe(map(({ data }) => data));
}
