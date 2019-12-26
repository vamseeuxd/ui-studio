import {Component, OnInit} from '@angular/core';
import {IAppHeaderMenuItem} from '../../components/app-header/app-header-menu-item.interface';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {HeaderService} from '../../services/header/header.service';
import {DeviceSimulatorService} from '../../services/device-simulator/device-simulator.service';
import {ManageUifGroupsService} from '../../services/manage-uif-components/manage-uif-groups.service';
import {ManageUifComponentsContainer} from '../manage-uif-components-container/manage-uif-components-container.component';

@Component({
  selector: 'ui-studio-header-container',
  templateUrl: './ui-studio-header-container-container.component.html',
  styleUrls: ['./ui-studio-header-container-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UiStudioHeaderContainerContainer {

  title = 'UI-Studio';
  menuList$ = this.headerService.menuListAction$;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private headerService: HeaderService,
    private deviceSimulatorService: DeviceSimulatorService,
  ) {
  }


  menuOptionClick(option: any) {
    switch (option.id) {
      case 'uIFComponent':
        this.showManageUifComponentsModel();
        break;
      case 'managePages':
        this.showManagePagesComponent();
        break;
      case 'clearCode':
        this.clearActivePageCode();
        break;
      case 'lg':
      case 'md':
      case 'sm':
      case 'xs':
        this.deviceSimulatorService.showPreview();
        break;
    }

  }

  private clearActivePageCode() {
    const isConfirmed = confirm('Are you sure! do you want to clear Active Page Code?');
    if (isConfirmed) {
    }
  }

  private showManagePagesComponent() {
  }

  showManageUifComponentsModel() {
    this.modalService.show(
      ManageUifComponentsContainer,
      {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: true,
        keyboard: false,
        class: 'uif-component-modal-window modal-dialog modal-xl',
      }
    );
  }

}
