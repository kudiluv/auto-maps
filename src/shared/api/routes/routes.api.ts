import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { map, Observable } from 'rxjs';
import { RouteItemOfListDto } from './types/route-item-of-list.type';

@Injectable({ providedIn: 'root' })
export class RoutesApi {
  constructor(private apiService: ApiService) {}

  public getAll(): Observable<RouteItemOfListDto[]> {
    return this.apiService
      .get<RouteItemOfListDto[]>('/routes')
      .pipe(map(({ data }) => data));
  }
}
