import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ui-studio-right-side-panel',
  templateUrl: './ui-studio-right-side-panel-container.component.html',
  styleUrls: ['./ui-studio-right-side-panel-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UiStudioRightSidePanelContainer implements OnInit {

  data = [
    { 'name': 'Test 01', 'id': '1578127062414_0', 'value': 'Primary', 'dataType': 'STRING' },
    { 'name': 'Test 02', 'id': '1578127062414_1', 'value': 'Primary', 'dataType': 'NUMBER' },
    { 'name': 'Test 03', 'id': '1578127062414_2', 'value': 'Primary', 'dataType': 'BOOLEAN' },
    { 'name': 'Test 04', 'id': '1578127062414_3', 'value': 'Primary', 'dataType': 'DATE' },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
