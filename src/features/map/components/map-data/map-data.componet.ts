import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MapsService } from 'features/map/model/maps.service';

@Component({
  selector: 'app-map-data',
  templateUrl: './map-data.component.html',
  standalone: true,
})
export class MapDataComponent implements OnInit, OnDestroy {
  constructor(private mapsService: MapsService) {}
  ngOnInit(): void {
    setTimeout(() => this.mapsService.addData(this.template), 0);
  }

  @ViewChild('template')
  public template!: TemplateRef<unknown>;

  ngOnDestroy(): void {
    this.mapsService.removeData(this.template);
  }
}
