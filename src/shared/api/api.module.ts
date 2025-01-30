import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { RoutesApi } from '../../entities/route/api/routes.api';

@NgModule({
  imports: [],
  providers: [
    ApiService,
    RoutesApi,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class ApiModule {}
