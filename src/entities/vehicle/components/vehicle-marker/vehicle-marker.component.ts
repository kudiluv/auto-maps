import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReplaySubject, combineLatest, from, map, share } from 'rxjs';
import { Router } from '@angular/router';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { CommonModule } from '@angular/common';
import { VehiclePosition } from 'entities/vehicle/types/vehicle-position.type';
import { RoutesStore } from 'entities/route/model/routes.store';

@Component({
  selector: 'app-vehicle-marker',
  templateUrl: './vehicle-marker.component.html',
  styleUrl: './vehicle-marker.component.scss',
  standalone: true,
  imports: [NgxMapboxGLModule, CommonModule],
})
export class VehicleMarkerComponent {
  constructor(
    private router: Router,
    private routesStore: RoutesStore
  ) {}

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  svg = from<Promise<HTMLImageElement>>(
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = '/assets/bus-marker.svg';
      img.height = 100;
      img.width = 100;
    })
  );

  images$ = combineLatest([this.routesStore.routes, this.svg]).pipe(
    map(([routes, svg]) => {
      const canvas = this.canvas.nativeElement;
      const context = this.canvas.nativeElement.getContext('2d', {
        willReadFrequently: true,
      })!;

      canvas.width = svg.width;
      canvas.height = svg.height;

      context.clearRect(0, 0, svg.width, svg.height);
      context.drawImage(svg, 0, 0);
      context.font = 'bold 24px sans-serif';
      context.textAlign = 'center';
      context.fillStyle = 'black';
      const imageWithoutText = context.getImageData(
        0,
        0,
        svg.width,
        svg.height
      );

      const imgs: {
        id: string;
        data: ImageData;
      }[] = [];

      for (const route of routes) {
        context.putImageData(imageWithoutText, 0, 0);
        context.fillText(route.routeNum, svg.width / 2, svg.height / 1.7);
        const newImg = context.getImageData(0, 0, svg.width, svg.height);
        imgs.push({
          id: `marker-${route.id}`,
          data: newImg,
        });
      }

      return imgs;
    }),
    share({
      connector: () => new ReplaySubject(1),
      resetOnComplete: false,
    })
  );

  @Input()
  vehiclePosition!: VehiclePosition;
}
