import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {UifComponentCreatorService} from '../../../services/uif-component-creator/uif-component-creator.service';

@Component({
  selector: 'ui-studio-uif-component-preview',
  templateUrl: './uif-component-preview.component.html',
  styleUrls: ['./uif-component-preview.component.scss']
})
export class UifComponentPreviewComponent implements OnInit {
  @HostBinding('class') className = 'p-3 col-12 border border-top-0';
  @ViewChild('outputContainer', {static: false}) outputContainer: ElementRef<HTMLElement>;
  htmlTemplate = ``;

  constructor(public service: UifComponentCreatorService) {
    this.service.htmlTemplate$.subscribe(value => (this.htmlTemplate = value));
    this.service.componentConfig$.subscribe(value => {
      if (this.outputContainer && value) {
        this.outputContainer.nativeElement.innerHTML = '';
        this.outputContainer.nativeElement.append(this.service.renderComponentFromJson(value));
      }
    });
  }

  ngOnInit() {
  }

}
