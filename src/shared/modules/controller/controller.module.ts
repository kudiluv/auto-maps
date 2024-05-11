import { NgModule } from '@angular/core';
import { ControllerComponent } from './components/controller/controller.component';
import { CommonModule } from '@angular/common';
import { ControllerHostComponent } from './components/controller-host/controller-host.component';

@NgModule({
  declarations: [ControllerComponent, ControllerHostComponent],
  imports: [CommonModule],
  exports: [ControllerComponent, ControllerHostComponent],
})
export class ControllerModule {}
