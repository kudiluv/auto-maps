import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  public _datas$ = new BehaviorSubject<TemplateRef<any>[]>([]);

  public addData(controller: TemplateRef<any>) {
    this._datas$.next([...this._datas$.value, controller]);
  }

  public removeData(controller: TemplateRef<any>) {
    this._datas$.next(this._datas$.value.filter(c => c !== controller));
  }

  public datas$ = this._datas$.asObservable();
}
