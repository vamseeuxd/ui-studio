import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UifComponentCreatorComponent} from './uif-component-creator.component';
import {UifComponentConfigEditorComponent} from './uif-component-config-editor/uif-component-config-editor.component';
import {UifComponentAddTemplateComponent} from './uif-component-add-template/uif-component-add-template.component';
import {UifComponentPreviewComponent} from './uif-component-preview/uif-component-preview.component';
import {UifComponentJsonConfigComponent} from './uif-component-json-config/uif-component-json-config.component';
import {TabsModule} from 'ngx-bootstrap';
import {HighlightModule} from 'ngx-highlightjs';
import {FormsModule} from '@angular/forms';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {UifComponentEditorComponent} from './uif-component-editor/uif-component-editor.component';
import {UifComponentBasicDetailsComponent} from './uif-component-basic-details/uif-component-basic-details.component';
import {OutSideClickModule} from '../out-side-click/out-side-click.module';
import {EditableDropdownListModule} from '../editable-dropdown-list/editable-dropdown-list.module';

@NgModule({
    declarations: [
        UifComponentCreatorComponent,
        UifComponentAddTemplateComponent,
        UifComponentPreviewComponent,
        UifComponentJsonConfigComponent,
        UifComponentConfigEditorComponent,
        UifComponentEditorComponent,
        UifComponentBasicDetailsComponent,
    ],
    imports: [
        CommonModule,
        TabsModule,
        HighlightModule,
        FormsModule,
        NgxJsonViewerModule,
        OutSideClickModule,
        EditableDropdownListModule,
    ], exports: [
        UifComponentCreatorComponent,
        UifComponentAddTemplateComponent,
        UifComponentPreviewComponent,
        UifComponentJsonConfigComponent,
        UifComponentConfigEditorComponent,
        UifComponentEditorComponent,
        UifComponentBasicDetailsComponent,
    ],
    providers: []
})
export class UifComponentCreatorModule {
    // noinspection JSUnusedGlobalSymbols
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UifComponentCreatorModule,
            providers: []
        };
    }
}
