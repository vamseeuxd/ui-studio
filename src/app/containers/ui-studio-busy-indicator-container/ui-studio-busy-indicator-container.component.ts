import {Component, OnInit} from '@angular/core';
import {BusyIndicatorService} from '../../services/busy-indicator/busy-indicator.service';

@Component({
  selector: 'ui-studio-busy-indicator-container',
  templateUrl: './ui-studio-busy-indicator-container.component.html',
  styleUrls: ['./ui-studio-busy-indicator-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UiStudioBusyIndicatorContainer {
  showBusyIndicator$ = this.busyIndicatorService.showBusyIndicator$;

  constructor(public busyIndicatorService: BusyIndicatorService) {
  }
}
