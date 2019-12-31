import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {DeviceSimulatorService} from '../../services/device-simulator/device-simulator.service';
import {Subscription} from 'rxjs';
import {dragEnd$, dragStartAndDragStop$, uiStudioStageId} from '../../utils/drag-and-drop-utils';
import {DragAndDropService} from '../../services/drag-and-drop/drag-and-drop.service';
import {UifComponentCreatorService} from '../../services/uif-component-creator/uif-component-creator.service';
import {DefaultCssUnitEnum} from '../../utils/default-css-unit.enum';
import {filter, map} from 'rxjs/operators';
import {UiStudioComponentsService} from '../../services/ui-studio-components/ui-studio-components.service';
import {UiStudioComponentModel} from '../../models/ui-studio-component.model';
import {ManageUifGroupsService} from '../../services/manage-uif-groups/manage-uif-groups.service';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';
import {moveItem} from '../../utils/move-item';

@Component({
  selector: 'ui-studio-middle-content',
  templateUrl: './ui-studio-middle-content-container.component.html',
  styleUrls: ['./ui-studio-middle-content-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UiStudioMiddleContentContainer implements OnInit {
  @ViewChild('uiStudioPage', {static: false}) uiStudioPage;
  @ViewChild('canvas', {static: false}) canvas;
  isPreview$ = this.deviceSimulatorService.isPreview$;
  private currentPageUiStudioComponent: UiStudioComponentModel[] = [];
  private currentPageId = 'demo-page';

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.uiStudioPage.nativeElement.classList.remove('animation');
    this.fitToParent(this.uiStudioPage.nativeElement);
    this.uiStudioPage.nativeElement.classList.add('animation');
  }

  constructor(
    private deviceSimulatorService: DeviceSimulatorService,
    private dragAndDropService: DragAndDropService,
    private uifComponentCreatorService: UifComponentCreatorService,
    private uiStudioComponentsService: UiStudioComponentsService,
    private manageUifGroupsService: ManageUifGroupsService
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.fitToParent(this.uiStudioPage.nativeElement);
      this.uiStudioPage.nativeElement.classList.add('animation');
    });

    dragEnd$.pipe(
      filter(
        (event: MouseEvent) => {
          return (
            (
              (event.target as HTMLElement).classList.contains('ui-studio-page') ||
              (event.target as HTMLElement).classList.contains('ui-studio-container') ||
              (event.target as HTMLElement).classList.contains('ui-studio-component')
            ) && !!this.dragAndDropService.currentDraggingComponentConfig
          );
        }
      ),
      map(
        (event: MouseEvent) => {
          const mouseTarget: HTMLElement = (event.target as HTMLElement);
          const isUiStudioDropContainer = mouseTarget.classList.contains('ui-studio-container');
          const isUiStudioPage = mouseTarget.classList.contains('ui-studio-page');
          const isUiStudioComponent = mouseTarget.classList.contains('ui-studio-component');

          if (isUiStudioDropContainer) {
            console.log('isUiStudioDropContainer', isUiStudioDropContainer);
          }
          if (isUiStudioPage) {
            console.log('isUiStudioPage', isUiStudioPage);
          }
          if (isUiStudioComponent) {
            console.log('isUiStudioComponent', isUiStudioComponent);
          }

          const uifComponentId = this.dragAndDropService.currentDraggingComponentConfig.id;
          let position = null;
          const pageId = this.currentPageId;
          let parentId = null;
          let containerId = null;
          if (isUiStudioPage) {
            position = this.canvas.nativeElement.childElementCount;
            parentId = null;
            containerId = null;
            // tslint:disable-next-line:max-line-length
            const uiStudioComponent = this.uiStudioComponentsService.getNewUiStudioComponent(uifComponentId, position, pageId, parentId, containerId);
            this.dragAndDropService.currentDraggingComponentConfig = null;
            return uiStudioComponent;
          }
          if (isUiStudioDropContainer) {
            position = mouseTarget.childElementCount;
            containerId = mouseTarget.id.split('_')[1];
            parentId = mouseTarget.id.split('_')[0];
            // tslint:disable-next-line:max-line-length
            const uiStudioComponent = this.uiStudioComponentsService.getNewUiStudioComponent(uifComponentId, position, pageId, parentId, containerId);
            this.dragAndDropService.currentDraggingComponentConfig = null;
            return uiStudioComponent;
          }
          if (isUiStudioComponent) {
            position = Array.from(mouseTarget.parentElement.children).indexOf(mouseTarget);
            // todo : Set Parent ID for ui-studio-container
            parentId = mouseTarget.parentElement.classList.contains('ui-studio-page') ? null : '';
            // todo : Set Container ID for ui-studio-container
            containerId = mouseTarget.parentElement.classList.contains('ui-studio-page') ? null : '';
            // tslint:disable-next-line:max-line-length
            const uiStudioComponent = this.uiStudioComponentsService.getNewUiStudioComponent(uifComponentId, position, pageId, parentId, containerId);
            this.dragAndDropService.currentDraggingComponentConfig = null;
            return uiStudioComponent;
          }
          this.dragAndDropService.currentDraggingComponentConfig = null;
          return null;
        }
      ),
      filter(value => !!value)
    ).subscribe(
      (uiStudioComponent: UiStudioComponentModel) => {
        const newPosition = uiStudioComponent.position;
        const listToUpdate = this.currentPageUiStudioComponent;
        if (newPosition < listToUpdate.length) {
          listToUpdate.push(uiStudioComponent);
          moveItem(listToUpdate.length - 1, newPosition, listToUpdate);
        } else {
          listToUpdate.push(uiStudioComponent);
        }
        listToUpdate.forEach((value, index) => value.position = index);
        this.updatePageElements();
      }
    );
  }

  updatePageElements() {
    const parentContainer: HTMLElement = this.canvas.nativeElement as HTMLElement;
    parentContainer.innerHTML = '';
    const uiStudioComponents = this.currentPageUiStudioComponent.filter(value => (value.pageId === this.currentPageId && value.parentId === null));
    this.addUiStudioComponents(uiStudioComponents, parentContainer);
  }

  updateContainerElements(uiStudioComponent: UiStudioComponentModel, container: HTMLElement) {
    const uiStudioComponents = this.currentPageUiStudioComponent.filter(value => (value.parentId === uiStudioComponent.id));
    const uiStudioContainers = Array.from(container.getElementsByClassName('ui-studio-container'));
    if (uiStudioComponents.length > 0 && uiStudioContainers.length > 0) {
      uiStudioContainers.forEach(parentContainer => {
        const containerId = parentContainer.id.split('_')[1];
        this.addUiStudioComponents(uiStudioComponents.filter(value => value.containerId === containerId), parentContainer as HTMLElement);
      });
    }
  }

  addUiStudioComponents(uiStudioComponents: UiStudioComponentModel[], parentContainer: HTMLElement) {
    uiStudioComponents.forEach(value => {
      const uifComponentConfig: UifComponentConfigInterface = this.manageUifGroupsService.getComponentById(value.uifComponentId);
      const uiStudioElement = this.uifComponentCreatorService.renderComponentFromJson(uifComponentConfig, value.id);
      uiStudioElement.classList.add('ui-studio-component');
      uiStudioElement.id = value.id;
      this.updateContainerElements(value, uiStudioElement);
      if (uifComponentConfig.isResponsive) {
        const column = this.uifComponentCreatorService.renderColumn(uifComponentConfig.defaultResponsiveWidth);
        column.append(uiStudioElement);
        parentContainer.append(column);
      } else {
        parentContainer.append(uiStudioElement);
      }
    });
  }

  fitToParent(element) {
    element.style.width = element.parentElement.clientWidth + 'px';
    element.style.height = element.parentElement.clientHeight + 'px';
  }

}
