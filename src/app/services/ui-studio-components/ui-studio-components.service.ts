import {Injectable} from '@angular/core';
import {ManageUifGroupsService} from '../manage-uif-groups/manage-uif-groups.service';
import {UiStudioComponentModel} from '../../models/ui-studio-component.model';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';
import {UiStudioComponentPropertyModel} from '../../models/ui-studio-component-property.model';

@Injectable({
  providedIn: 'root'
})
export class UiStudioComponentsService {

  constructor(
    private manageUifGroupsService: ManageUifGroupsService
  ) {
  }

  // tslint:disable-next-line:max-line-length
  public getNewUiStudioComponent(uifComponentId: string, position: number, pageId: string, parentId: string, containerId: string): UiStudioComponentModel {
    const uiStudioComponent = new UiStudioComponentModel(uifComponentId, position, pageId, parentId, containerId);
    const uifComponentConfig: UifComponentConfigInterface = this.manageUifGroupsService.getComponentById(uifComponentId);
    if(uifComponentConfig && uifComponentConfig.model) {
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
