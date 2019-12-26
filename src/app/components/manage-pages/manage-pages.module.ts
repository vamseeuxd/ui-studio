import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagePagesComponent} from './manage-pages.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        ManagePagesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        ManagePagesComponent
    ],
    entryComponents: [
        ManagePagesComponent
    ]
})
export class ManagePagesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ManagePagesModule,
            providers: []
        };
    }
}
