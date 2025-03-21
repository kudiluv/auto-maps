import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@Component({
  selector: 'app-three-demencional-layer',
  templateUrl: './three-demencional-layer.component.html',
  imports: [CommonModule, NgxMapboxGLModule],
})
export class ThreeDimensionalLayerComponent {
  constructor() {}
}
