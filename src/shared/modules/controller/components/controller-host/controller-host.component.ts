import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../../controller.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-controller-host',
  templateUrl: './controller-host.component.html',
  styleUrls: ['./controller-host.component.scss'],
})
export class ControllerHostComponent implements OnInit {
  constructor(private controllerService: ControllerService) {}

  protected controllersSorted$ = this.controllerService.controllers$.pipe(
    map(controllers => controllers.sort((a, b) => a.index - b.index))
  );

  protected controllersLeft$ = this.controllersSorted$.pipe(
    map(controllers =>
      controllers.filter(({ position }) => position === 'left')
    )
  );

  protected controllersCenter$ = this.controllersSorted$.pipe(
    map(controllers =>
      controllers.filter(({ position }) => position === 'center')
    )
  );

  protected controllersRight$ = this.controllersSorted$.pipe(
    map(controllers =>
      controllers.filter(({ position }) => position === 'right')
    )
  );

  ngOnInit(): void {}
}
