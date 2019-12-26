import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from './app-header.component';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
    declarations: [
        AppHeaderComponent
    ],
    imports: [
        CommonModule,
        BsDropdownModule
    ],
    exports: [
        AppHeaderComponent
    ]
})
export class AppHeaderModule {
}
