import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent implements OnInit {
  @HostBinding('class') className = 'list-group-item rounded-0';
  @Input() property:any;
  constructor() {
  }

  ngOnInit() {
  }

}
