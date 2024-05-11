import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  constructor() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this._isDark = new BehaviorSubject<boolean>(true);
    } else {
      this._isDark = new BehaviorSubject<boolean>(false);
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        this._isDark.next(event.matches);
      });
    this.isDark = this._isDark.asObservable();
  }

  private _isDark: BehaviorSubject<boolean>;

  public isDark: Observable<boolean>;

  public toggle = () => {
    this._isDark.next(!this._isDark.value);
  };
}
