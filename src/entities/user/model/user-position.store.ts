import { Injectable } from '@angular/core';
import { Point } from 'geojson';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserPositionStore {
  private position = new BehaviorSubject<Point>({
    type: 'Point',
    coordinates: [47.24616282214704, 39.70530751811469],
  });

  public position$ = this.position.asObservable();

  setPosition(point: Point) {
    this.position.next(point);
  }
}
