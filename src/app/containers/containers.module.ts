import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../components/components.module';
import {UiStudioLeftSidePanelContainer} from './ui-studio-left-side-panel/ui-studio-left-side-panel-container.component';
import {UifComponentsListModule} from '../components/uif-components-list/uif-components-list.module';
import {UiStudioRightSidePanelContainer} from './ui-studio-right-side-panel/ui-studio-right-side-panel-container.component';
import {UiStudioMiddleContentContainer} from './ui-studio-middle-content/ui-studio-middle-content-container.component';
import {UiStudioHeaderContainerContainer} from './ui-studio-header-container/ui-studio-header-container-container.component';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { UiStudioBusyIndicatorContainer } from './ui-studio-busy-indicator-container/ui-studio-busy-indicator-container.component';


@NgModule({
  declarations: [
    UiStudioLeftSidePanelContainer,
    UiStudioRightSidePanelContainer,
    UiStudioMiddleContentContainer,
    UiStudioHeaderContainerContainer,
    UiStudioBusyIndicatorContainer],
  exports: [
    UiStudioLeftSidePanelContainer,
    UiStudioRightSidePanelContainer,
    UiStudioMiddleContentContainer,
    UiStudioHeaderContainerContainer,
    UiStudioBusyIndicatorContainer
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UifComponentsListModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule
  ]
})
export class ContainersModule {
}
