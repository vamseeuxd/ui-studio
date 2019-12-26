import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UifComponentsListComponent} from './uif-components-list.component';

@NgModule({
    declarations: [
        UifComponentsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ], exports: [
        UifComponentsListComponent
    ],
    providers: []
})
export class UifComponentsListModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UifComponentsListModule,
            providers: []
        };
    }
}
