import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditableDropdownListComponent} from './editable-dropdown-list.component';
import {FormsModule} from '@angular/forms';
import {OutSideClickModule} from '../out-side-click/out-side-click.module';

@NgModule({
    declarations: [
        EditableDropdownListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        OutSideClickModule
    ], exports: [
        EditableDropdownListComponent
    ],
    providers: []
})
export class EditableDropdownListModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EditableDropdownListModule,
            providers: []
        };
    }
}
