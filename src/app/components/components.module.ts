import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiStudioHeaderComponent} from './ui-studio-header/ui-studio-header.component';
import {AppHeaderModule} from './app-header/app-header.module';
import {BusyIndicatorModule} from './busy-indicator/busy-indicator.module';
import {EditableDropdownListModule} from './editable-dropdown-list/editable-dropdown-list.module';
import {ManagePagesModule} from './manage-pages/manage-pages.module';
import {OutSideClickModule} from './out-side-click/out-side-click.module';
import {UifComponentCreatorModule} from './uif-component-creator/uif-component-creator.module';
import {UifComponentsListModule} from './uif-components-list/uif-components-list.module';


@NgModule({
  declarations: [
    UiStudioHeaderComponent,
  ],
  exports: [
    UiStudioHeaderComponent,
    AppHeaderModule,
    BusyIndicatorModule
  ],
  imports: [
    CommonModule,
    AppHeaderModule,
    BusyIndicatorModule,
    EditableDropdownListModule,
    ManagePagesModule,
    OutSideClickModule,
    UifComponentCreatorModule,
    UifComponentsListModule.forRoot()
  ]
})
export class ComponentsModule {
}
