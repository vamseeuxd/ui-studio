import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../components/components.module';
import {UiStudioLeftSidePanelContainer} from './ui-studio-left-side-panel/ui-studio-left-side-panel-container.component';
import {UifComponentsListModule} from '../components/uif-components-list/uif-components-list.module';
import {UiStudioRightSidePanelContainer} from './ui-studio-right-side-panel/ui-studio-right-side-panel-container.component';
import {UiStudioMiddleContentContainer} from './ui-studio-middle-content/ui-studio-middle-content-container.component';
import {UiStudioHeaderContainerContainer} from './ui-studio-header-container/ui-studio-header-container-container.component';
import {BsDropdownModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {UiStudioBusyIndicatorContainer} from './ui-studio-busy-indicator-container/ui-studio-busy-indicator-container.component';
import {ManageUifComponentsContainer} from './manage-uif-components-container/manage-uif-components-container.component';


@NgModule({
  declarations: [
    UiStudioLeftSidePanelContainer,
    UiStudioRightSidePanelContainer,
    UiStudioMiddleContentContainer,
    UiStudioHeaderContainerContainer,
    UiStudioBusyIndicatorContainer,
    ManageUifComponentsContainer
  ],
  exports: [
    UiStudioLeftSidePanelContainer,
    UiStudioRightSidePanelContainer,
    UiStudioMiddleContentContainer,
    UiStudioHeaderContainerContainer,
    UiStudioBusyIndicatorContainer,
    ManageUifComponentsContainer
  ],
  entryComponents: [
    ManageUifComponentsContainer
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UifComponentsListModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule
  ]
})
export class ContainersModule {
}
