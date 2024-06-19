import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehicleLayerService {
  private vehecleLayerId: undefined | string;

  get currentVehecleLayerId() {
    return this.vehecleLayerId;
  }

  setCurrentVehicleLayerId(value: string) {
    this.vehecleLayerId = value;
  }

  clear() {
    this.vehecleLayerId = undefined;
  }
}
