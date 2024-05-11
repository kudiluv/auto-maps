import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControllerComponent } from './components/controller/controller.component';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  private _controllers$ = new BehaviorSubject<ControllerComponent[]>([]);

  public addController(controller: ControllerComponent) {
    this._controllers$.next([...this._controllers$.value, controller]);
  }

  public removeController(controller: ControllerComponent) {
    this._controllers$.next(
      this._controllers$.value.filter(c => c !== controller)
    );
  }

  public controllers$ = this._controllers$.asObservable();
}
