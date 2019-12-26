import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {DeviceSimulatorService} from '../../services/device-simulator/device-simulator.service';

@Component({
  selector: 'ui-studio-middle-content',
  templateUrl: './ui-studio-middle-content-container.component.html',
  styleUrls: ['./ui-studio-middle-content-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UiStudioMiddleContentContainer implements OnInit {
  @ViewChild('stage', {static: false}) stage;
  isPreview$ = this.deviceSimulatorService.isPreview$;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.stage.nativeElement.classList.remove('animation');
    this.fitToParent(this.stage.nativeElement);
    this.stage.nativeElement.classList.add('animation');
  }

  constructor(private deviceSimulatorService: DeviceSimulatorService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.fitToParent(this.stage.nativeElement);
      this.stage.nativeElement.classList.add('animation');
    });
  }

  fitToParent(element) {
    element.style.width = element.parentElement.clientWidth + 'px';
    element.style.height = element.parentElement.clientHeight + 'px';

    /*
    const scaleX = element.parentElement.clientWidth / element.clientWidth;
    const scaleY = element.parentElement.clientHeight / element.clientHeight;
    const translateX = element.parentElement.getBoundingClientRect().x / (element.parentElement.clientWidth - 20) * 100;
    const translateY = element.parentElement.getBoundingClientRect().y / (element.parentElement.clientHeight + 20) * 100;
    element.style.transformOrigin = '0 0';
    element.style.transform = `scale(${scaleX},${scaleY})   translate(${Math.ceil(translateX)}%, ${Math.ceil(translateY)}%)`;
    */
  }

}
