import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuiThemeNightModule, TuiModeModule } from '@taiga-ui/core';
import { DarkModeService } from 'shared/services/dark-mode.service';
import { TuiSheetDialogModule, TuiSheetModule } from '@taiga-ui/addon-mobile';
import { ControllerModule } from 'shared/modules/controller/controller.module';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    CommonModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiSheetDialogModule,
    TuiSheetModule,
    ControllerModule,
    IonicModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  title = 'auto-maps';
  constructor(readonly night: DarkModeService) {}
}
