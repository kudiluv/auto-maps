import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControllerService } from '../../controller.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
})
export class ControllerComponent implements OnInit, OnDestroy {
  constructor(private controllerService: ControllerService) {}
  ngOnInit(): void {
    this.controllerService.addController(this);
  }

  @Input()
  public index: number = 0;

  @Input()
  public position?: 'left' | 'center' | 'right' = 'left';

  @ViewChild('template')
  public template!: TemplateRef<unknown>;

  ngOnDestroy(): void {
    this.controllerService.removeController(this);
  }
}
