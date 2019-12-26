import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAppHeaderMenuItem} from './app-header-menu-item.interface';


@Component({
    selector: 'ui-studio-app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
    @Input() title = 'UI-Studio';
    @Input() dataProvider: IAppHeaderMenuItem[] = [];
    @Output() menuClick: EventEmitter<any> = new EventEmitter<any>();
}
