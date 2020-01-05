import {Injectable} from '@angular/core';
import {ManageUifGroupsService} from '../uif-components/manage-uif-groups/manage-uif-groups.service';
import {UiStudioComponentModel} from '../../models/ui-studio-component.model';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';
import {UiStudioComponentPropertyModel} from '../../models/ui-studio-component-property.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStudioComponentsService {

  private uiStudioComponentsList: UiStudioComponentModel[] = [
    {
      'uifComponentId': '1572345187510',
      'position': 0,
      'pageId': 'demo-page',
      'parentId': null,
      'containerId': null,
      'properties': [
        {
          'name': 'label',
          'id': '1578127062414_0',
          'value': 'Primary',
          'dataType': 'STRING'
        }
      ],
      'isSelected': false,
      'id': '1578127062414'
    }
  ];
  private uiStudioComponentsListSubject = new BehaviorSubject<any[]>(this.uiStudioComponentsList);
  uiStudioComponentsListAction$ = this.uiStudioComponentsListSubject.asObservable();

  constructor(
    private manageUifGroupsService: ManageUifGroupsService
  ) {
  }

  getUiStudioComponentsByContainerId(parentId: string, containerId: string): UiStudioComponentModel[] {
    return this.uiStudioComponentsList.filter(value => (value.parentId === parentId && value.containerId === containerId));
  }

  getUiStudioComponentsById(id: string): UiStudioComponentModel {
    return this.uiStudioComponentsList.find(value => (value.id === id));
  }

  excludeComponentFromList(idsToExclude: string[]) {
    this.uiStudioComponentsList = this.uiStudioComponentsList.filter(
      value => (idsToExclude.indexOf(value.id) < 0)
    );
  }

  updateComponentPosition(listToUpdate: UiStudioComponentModel[]) {
    listToUpdate.forEach((value, index) => value.position = index);
  }

  addUiStudioComponent(newUiStudioComponent: UiStudioComponentModel) {
    /**
     * Get all components related to newComponent Parent
     * */
    const arrayToUpdate = this.getUiStudioComponentsByContainerId(newUiStudioComponent.parentId, newUiStudioComponent.containerId);

    /**
     * If Component is Dropped before any existing Component add before that
     * else add Component as Last Child
     * */
    if (newUiStudioComponent.position < arrayToUpdate.length) {
      arrayToUpdate.splice(newUiStudioComponent.position, 0, newUiStudioComponent);
    } else {
      arrayToUpdate.push(newUiStudioComponent);
    }

    /**
     * Updating Component Position with New Positions
     * */
    this.updateComponentPosition(arrayToUpdate);

    /**
     * Exclude old references for newly updated components from existing list
     * */
    this.excludeComponentFromList(arrayToUpdate.map(value1 => value1.id));

    /**
     * Including newly update Components in existing list
     * */
    this.uiStudioComponentsList = [...this.uiStudioComponentsList, ...arrayToUpdate];

    /**
     * Dispatching a RXJS action
     * */
    this.uiStudioComponentsListSubject.next(this.uiStudioComponentsList);
  }

  moveUiStudioComponent(moveComponentInfo: { position: number, parentId: string, containerId: string, id: string }) {

    /**
     * Get Existing UiStudioComponentToUpdate
     * */
    const componentToMove = this.getUiStudioComponentsById(moveComponentInfo.id);

    /**
     * Exclude old references for newly updated components from existing list
     * */
    this.excludeComponentFromList([moveComponentInfo.id]);

    /**
     * Updating position, parentId and containerId for an existing Component
     * */
    componentToMove.position = moveComponentInfo.position;
    componentToMove.parentId = moveComponentInfo.parentId;
    componentToMove.containerId = moveComponentInfo.containerId;

    /**
     * Get all components related to componentToMove Parent
     * */
    const arrayToUpdate = this.getUiStudioComponentsByContainerId(moveComponentInfo.parentId, moveComponentInfo.containerId);

    /**
     * If Component is Dropped before any existing Component add before that
     * else add Component as Last Child
     * */
    if (moveComponentInfo.position < arrayToUpdate.length) {
      arrayToUpdate.splice(moveComponentInfo.position, 0, componentToMove);
    } else {
      arrayToUpdate.push(componentToMove);
    }

    /**
     * Updating Component Position with New Positions
     * */
    this.updateComponentPosition(arrayToUpdate);

    /**
     * Exclude old references for newly updated components from existing list
     * */
    this.excludeComponentFromList(arrayToUpdate.map(value1 => value1.id));

    /**
     * Including newly update Components in existing list
     * */
    this.uiStudioComponentsList = [...this.uiStudioComponentsList, ...arrayToUpdate];

    /**
     * Dispatching a RXJS action
     * */
    this.uiStudioComponentsListSubject.next(this.uiStudioComponentsList);
  }

  deleteUiStudioComponent(id: string) {

    /**
     * Get Existing UiStudioComponentToDelete
     * */
    const componentToDelete = this.getUiStudioComponentsById(id);

    /**
     * Exclude UiStudioComponent to delete references from existing list
     * */
    this.excludeComponentFromList([id]);

    /**
     * Get all components related to componentToMove Parent
     * */
    const arrayToUpdate = this.getUiStudioComponentsByContainerId(componentToDelete.parentId, componentToDelete.containerId);

    /**
     * Updating Component Position with New Positions
     * */
    this.updateComponentPosition(arrayToUpdate);

    /**
     * Exclude old references for newly updated components from existing list
     * */
    this.excludeComponentFromList(arrayToUpdate.map(value1 => value1.id));

    /**
     * Including newly update Components in existing list
     * */
    this.uiStudioComponentsList = [...this.uiStudioComponentsList, ...arrayToUpdate];

    /**
     * Dispatching a RXJS action
     * */
    this.uiStudioComponentsListSubject.next(this.uiStudioComponentsList);

    /**
     * Dispatching a RXJS action
     * */
    this.uiStudioComponentsListSubject.next(this.uiStudioComponentsList);
  }

  // tslint:disable-next-line:max-line-length
  public getNewUiStudioComponent(uifComponentId: string, position: number, pageId: string, parentId: string, containerId: string): UiStudioComponentModel {
    const uiStudioComponent = new UiStudioComponentModel(uifComponentId, position, pageId, parentId, containerId);
    const uifComponentConfig: UifComponentConfigInterface = this.manageUifGroupsService.getComponentById(uifComponentId);
    if (uifComponentConfig && uifComponentConfig.model) {
      uiStudioComponent.properties = uifComponentConfig.model.map((value, index) => {
        const newProperty: UiStudioComponentPropertyModel = new UiStudioComponentPropertyModel(
          value.propertyId,
          uiStudioComponent.id + '_' + index,
          value.propertyValue,
          value.propertyDataType
        );
        return newProperty;
      });
    }
    return uiStudioComponent;
  }
}
