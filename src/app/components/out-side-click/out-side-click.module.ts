import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OutSideClickDirective} from './out-side-click.directive';

@NgModule({
    declarations: [
        OutSideClickDirective
    ],
    imports: [
        CommonModule,
    ], exports: [
        OutSideClickDirective
    ],
    providers: []
})
export class OutSideClickModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: OutSideClickModule,
            providers: []
        };
    }
}
