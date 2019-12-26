import {Component, OnInit} from '@angular/core';
import {UifComponentsListService} from '../../services/uif-components-list/uif-components-list.service';

@Component({
  selector: 'ui-studio-left-side-panel-container',
  templateUrl: './ui-studio-left-side-panel-container.component.html',
  styleUrls: ['./ui-studio-left-side-panel-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UiStudioLeftSidePanelContainer implements OnInit {

  uifComponentsList$ = this.uifComponentsListService.uifComponentsListAction$;

  constructor(private uifComponentsListService: UifComponentsListService) {
  }

  ngOnInit() {
    this.uifComponentsListService.getUifComponentsList();
  }

}
