import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UifComponentConfigInterface} from '../uif-component-creator/uif-component-config.interface';

@Component({
  selector: 'uif-component-list',
  templateUrl: './uif-components-list.component.html',
  styleUrls: ['./uif-components-list.component.scss']
})
export class UifComponentsListComponent implements OnInit {

  private tempDataProvider: any[] = [];

  get dataProvider(): any[] {
    return this.tempDataProvider;
  }

  @Input()
  set dataProvider(value: any[]) {
    this.tempDataProvider = JSON.parse(JSON.stringify(value));
  }

  showMe = false;

  @Input() isGroup = true;
  @Input() labelField = 'name';

  @Output() startDrag: EventEmitter<{ option: UifComponentConfigInterface, event: MouseEvent }> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  openGroup(option: any) {
    if (this.isGroup) {
      option.isOpen = !option.isOpen;
    }
  }

  startDragComponent(option, event: MouseEvent) {
    if (!this.isGroup) {
      this.startDrag.emit({option, event});
    }
  }
}
