import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {UifComponentCreatorComponent} from '../../components/uif-component-creator/uif-component-creator.component';
import * as _ from 'lodash';
import {UifComponentGroup} from '../../models/uif-component-group.model';
import {ManageUifGroupsService} from '../../services/manage-uif-components/manage-uif-groups.service';

@Component({
  selector: 'app-manage-uif-components-container',
  templateUrl: './manage-uif-components-container.component.html',
  styleUrls: ['./manage-uif-components-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ManageUifComponentsContainer implements OnInit {

  @ViewChild('uifComponentCreator', {static: false}) uifComponentCreator: UifComponentCreatorComponent;
  uifComponentGroups$ = this.manageUifComponentsService.uifComponentGroupsAction$;
  uifComponents: any[] = [];
  uifComponentForUpdate;
  editingUifGroupItem;
  saveButtonLabel = 'Create Component';
  uifGroupDataSource: { data: UifComponentGroup[], idField: string, labelField: string } = {
    data: [],
    idField: 'id',
    labelField: 'name'
  };
  openedMenu = '';

  constructor(
    public bsModalRef: BsModalRef,
    public manageUifComponentsService: ManageUifGroupsService
  ) {
  }

  ngOnInit() {
  }

  cancelComponentUpdate(component: any, uifComponentCreator) {
    const isConfirmed = confirm('Are sure! Do you want to cancel?');
    if (isConfirmed) {
      this.uifComponentForUpdate = null;
      setTimeout(() => {
        this.saveButtonLabel = 'Create Component';
        uifComponentCreator.reset();
      });
    }
  }

  createNewComponent(newUifComponent: any, uifComponentCreator) {
    if (this.uifComponentForUpdate) {
    } else {
    }
    this.uifComponentForUpdate = null;
    setTimeout(() => {
      this.saveButtonLabel = 'Create Component';
      uifComponentCreator.reset();
    });
  }

  isComponentNameExists(componentName: string) {
    if (this.uifComponentForUpdate) {
      return this.uifComponents.filter(
        comp => (
          comp.componentName.trim().toLowerCase() !== this.uifComponentForUpdate.componentName.trim().toLowerCase()
        )
      )
        .filter(comp => (comp.componentName.trim().toLowerCase() === componentName.trim().toLowerCase())).length > 0;
    } else {
      return this.uifComponents.filter(comp => (comp.componentName.trim().toLowerCase() === componentName.trim().toLowerCase())).length > 0;
    }
  }

  deleteExistingComponent(component: any) {
    const isConfirmed = confirm('Are you sure! do you want to delete?');
    if (isConfirmed) {
    }
  }

  copyExistingComponent(component: any, uifComponentCreator) {
    const copyComponent = () => {
      uifComponentCreator.reset();
      this.uifComponentForUpdate = null;
      setTimeout(() => {
        this.saveButtonLabel = 'Create Component';
        const clonedData = _.cloneDeep(component);
        clonedData.componentName = clonedData.componentName + ' cloned';
        uifComponentCreator.update(clonedData);
      });
    };
    copyComponent.bind(this);
    if (this.uifComponentCreator.isDirty()) {
      const isConfirmed = confirm('Changes you have made not be saved! Do you want to continue?');
      if (isConfirmed) {
        copyComponent();
      }
    } else {
      copyComponent();
    }
  }

  updateExistingComponent(component: any, uifComponentCreator) {

    const updateComponent = () => {
      uifComponentCreator.reset();
      this.uifComponentForUpdate = component;
      setTimeout(() => {
        this.saveButtonLabel = 'Update Component';
        const clonedData = _.cloneDeep(component);
        uifComponentCreator.update(clonedData);
      });
    };
    updateComponent.bind(this);
    if (this.uifComponentCreator.isDirty()) {
      const isConfirmed = confirm('Changes you have made not be saved! Do you want to continue?');
      if (isConfirmed) {
        updateComponent();
      }
    } else {
      updateComponent();
    }
  }

  deleteUifGroupItem(option: UifComponentGroup) {
    const isConfirmed = confirm('Are you sure! do you want to delete?');
    if (isConfirmed) {
      this.manageUifComponentsService.deleteGroups(option.id);
    }
  }

  updateUifGroupItem($event: { item: UifComponentGroup; name: string }) {
    const isConfirmed = confirm('Are you sure! do you want to update?');
    if (isConfirmed) {
      this.manageUifComponentsService.updateGroup($event.name, $event.item.id);
    }
  }

  addUifGroup(newGroupName: string, uifComponentCreator) {
    this.manageUifComponentsService.addGroup(newGroupName);
    uifComponentCreator.resetNewGroup();
  }

  moveUifGroupItemToUp($event: UifComponentGroup) {
    this.manageUifComponentsService.moveUp($event.id);
  }

  moveUifGroupItemToDown($event: UifComponentGroup) {
    this.manageUifComponentsService.moveDown($event.id);
  }


  closeModalWindow(uifComponentCreator) {
    const isConfirmed = confirm('Are sure! Do you want to Close?, you may loose your unsaved changes');
    if (isConfirmed) {
      this.uifComponentForUpdate = null;
      setTimeout(() => {
        this.saveButtonLabel = 'Create Component';
        uifComponentCreator.reset();
        this.bsModalRef.hide();
      });
    }
  }

}
