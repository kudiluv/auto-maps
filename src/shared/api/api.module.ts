import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { RoutesApi } from '../../entities/route/api/routes.api';

@NgModule({
  imports: [HttpClientModule],
  providers: [ApiService, RoutesApi],
})
export class ApiModule {}
