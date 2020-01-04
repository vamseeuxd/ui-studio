import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {DeviceSimulatorService} from '../../services/device-simulator/device-simulator.service';
import {fromEvent, Subscription} from 'rxjs';
import {dragEnd$, draggingAndStop$, dragStartAndDragStop$, uiStudioStageId} from '../../utils/drag-and-drop-utils';
import {DragAndDropService} from '../../services/drag-and-drop/drag-and-drop.service';
import {UifComponentCreatorService} from '../../services/uif-component-creator/uif-component-creator.service';
import {filter, map} from 'rxjs/operators';
import {UiStudioComponentsService} from '../../services/ui-studio-components/ui-studio-components.service';
import {UiStudioComponentModel} from '../../models/ui-studio-component.model';
import {ManageUifGroupsService} from '../../services/manage-uif-groups/manage-uif-groups.service';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';

@Component({
  selector: 'ui-studio-middle-content',
  templateUrl: './ui-studio-middle-content-container.component.html',
  styleUrls: ['./ui-studio-middle-content-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UiStudioMiddleContentContainer implements OnInit {
  @ViewChild('uiStudioPage', {static: false}) uiStudioPage;
  @ViewChild('canvas', {static: false}) canvas;
  @ViewChild('actionButtons', {static: false}) actionButtons;
  isPreview$ = this.deviceSimulatorService.isPreview$;
  private currentPageUiStudioComponent: UiStudioComponentModel[] = [
    {
      'uifComponentId': '1572345187510',
      'position': 0,
      'pageId': 'demo-page',
      'parentId': '1578127058703',
      'containerId': '1575944347860',
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
    },
    {
      'uifComponentId': '1572346252536',
      'position': 1,
      'pageId': 'demo-page',
      'parentId': '1578127058703',
      'containerId': '1575944334788',
      'properties': [],
      'isSelected': false,
      'id': '1578127065294'
    },
    {
      'uifComponentId': '1575610734766',
      'position': 2,
      'pageId': 'demo-page',
      'parentId': null,
      'containerId': null,
      'properties': [],
      'isSelected': false,
      'id': '1578127058703'
    }
  ];
  private currentPageId = 'demo-page';
  private currentComponentId = null;

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

  isDragOnProgress(): boolean {
    return !!this.dragAndDropService.currentDraggingComponent;
  }

  ngOnInit() {
    // this.currentPageUiStudioComponent = [];
    setTimeout(() => {
      this.fitToParent(this.uiStudioPage.nativeElement);
      this.uiStudioPage.nativeElement.classList.add('animation');
      this.hideActionButtons();
      this.refreshCurrentPage();
    });

    dragEnd$.pipe(
      filter(
        (event: MouseEvent) => {
          return (
            (
              (event.target as HTMLElement).classList.contains('ui-studio-page') ||
              (event.target as HTMLElement).classList.contains('ui-studio-container') ||
              (event.target as HTMLElement).classList.contains('ui-studio-component')
            ) &&
            !!this.dragAndDropService.currentDraggingComponent
          );
        }
      ),
      map(
        (event: MouseEvent) => {
          const mouseTarget: HTMLElement = (event.target as HTMLElement);
          const isUiStudioDropContainer = mouseTarget.classList.contains('ui-studio-container');
          const isUiStudioPage = mouseTarget.classList.contains('ui-studio-page');
          const isUiStudioComponent = mouseTarget.classList.contains('ui-studio-component');

          let position = null;
          const pageId = this.currentPageId;
          let parentId = null;
          let containerId = null;
          let newUiStudioComponent = null;
          let uifComponentId = null;

          if (isUiStudioPage) {
            position = this.canvas.nativeElement.childElementCount;
            parentId = null;
            containerId = null;
            if (this.dragAndDropService.isNewComponent) {
              uifComponentId = this.dragAndDropService.currentDraggingComponentConfig.id;
              newUiStudioComponent = this.uiStudioComponentsService.getNewUiStudioComponent(
                uifComponentId,
                position,
                pageId,
                parentId,
                containerId
              );
            }
          }
          if (isUiStudioDropContainer) {
            position = mouseTarget.childElementCount;
            containerId = mouseTarget.id.split('_')[1];
            parentId = mouseTarget.id.split('_')[0];
            if (this.dragAndDropService.isNewComponent) {
              uifComponentId = this.dragAndDropService.currentDraggingComponentConfig.id;
              newUiStudioComponent = this.uiStudioComponentsService.getNewUiStudioComponent(
                uifComponentId,
                position,
                pageId,
                parentId,
                containerId
              );
            }
          }
          if (isUiStudioComponent) {
            position = Array.from(mouseTarget.parentElement.children).indexOf(mouseTarget);
            parentId = mouseTarget.parentElement.classList.contains('ui-studio-page') ? null : mouseTarget.parentElement.id.split('_')[0];
            containerId = mouseTarget.parentElement.classList.contains('ui-studio-page') ? null : mouseTarget.parentElement.id.split('_')[1];
            if (this.dragAndDropService.isNewComponent) {
              uifComponentId = this.dragAndDropService.currentDraggingComponentConfig.id;
              newUiStudioComponent = this.uiStudioComponentsService.getNewUiStudioComponent(
                uifComponentId,
                position,
                pageId,
                parentId,
                containerId
              );
            }
          }
          const objectToReturn = {
            newUiStudioComponent,
            isNewComponent: this.dragAndDropService.isNewComponent,
            isExistingComponent: this.dragAndDropService.isExistingComponent,
            moveComponentInfo: {
              position,
              parentId,
              containerId,
              id: this.dragAndDropService.currentDraggingComponent.id
            }
          };
          return objectToReturn;
        }
      ),
      filter(value => !!value)
    ).subscribe(
      ({newUiStudioComponent, isExistingComponent, isNewComponent, moveComponentInfo}) => {
        if (isNewComponent) {
          const parentId = newUiStudioComponent.parentId;
          const containerId = newUiStudioComponent.containerId;
          const componentIndex = newUiStudioComponent.position;
          const arrayToUpdate = this.currentPageUiStudioComponent.filter(value => (value.parentId === parentId && value.containerId === containerId));
          if (componentIndex < arrayToUpdate.length) {
            arrayToUpdate.splice(componentIndex, 0, newUiStudioComponent);
          } else {
            arrayToUpdate.push(newUiStudioComponent);
          }
          arrayToUpdate.forEach((value, index) => value.position = index);
          this.currentPageUiStudioComponent = this.currentPageUiStudioComponent.filter(
            value => (arrayToUpdate.map(value1 => value1.id).indexOf(value.id) < 0)
          );
          this.currentPageUiStudioComponent = [...this.currentPageUiStudioComponent, ...arrayToUpdate];
          this.refreshCurrentPage();
        } else if (isExistingComponent) {
          const parentId = moveComponentInfo.parentId;
          const containerId = moveComponentInfo.containerId;
          const componentIndex = moveComponentInfo.position;
          const componentToMove = this.currentPageUiStudioComponent.find(value => (value.id === moveComponentInfo.id));
          this.currentPageUiStudioComponent = this.currentPageUiStudioComponent.filter(value => (value.id !== moveComponentInfo.id));
          componentToMove.position = moveComponentInfo.position;
          componentToMove.parentId = moveComponentInfo.parentId;
          componentToMove.containerId = moveComponentInfo.containerId;
          const arrayToUpdate = this.currentPageUiStudioComponent.filter(value => (value.parentId === parentId && value.containerId === containerId));
          if (componentIndex < arrayToUpdate.length) {
            arrayToUpdate.splice(componentIndex, 0, componentToMove);
          } else {
            arrayToUpdate.push(componentToMove);
          }
          arrayToUpdate.forEach((value, index) => value.position = index);
          this.currentPageUiStudioComponent = this.currentPageUiStudioComponent.filter(
            value => (arrayToUpdate.map(value1 => value1.id).indexOf(value.id) < 0)
          );
          this.currentPageUiStudioComponent = [...this.currentPageUiStudioComponent, ...arrayToUpdate];
          this.refreshCurrentPage();
        }
      }
    );
  }

  refreshCurrentPage() {
    this.removeActionButtonEventListeners();
    this.updatePageElements();
    this.addActionButtonEventListeners();
  }

  removeActionButtonEventListeners() {

  }

  addActionButtonEventListeners() {

    const canvasMouseMOve$ = fromEvent(this.canvas.nativeElement, 'mousemove', {capture: true})
      .pipe(
        filter(
          (event: MouseEvent) => {
            const mouseTarget: HTMLElement = (event.target as HTMLElement);
            const isUiStudioDropContainer = mouseTarget.classList.contains('ui-studio-container');
            const isUiStudioComponent = mouseTarget.classList.contains('ui-studio-component');
            let currentComponentId = '';
            if (isUiStudioComponent) {
              currentComponentId = mouseTarget.id;
            } else if (isUiStudioDropContainer) {
              currentComponentId = mouseTarget.id.split('_')[0];
            }
            return (
                (event.target as HTMLElement).classList.contains('ui-studio-container') ||
                (event.target as HTMLElement).classList.contains('ui-studio-component')
              ) &&
              !this.dragAndDropService.currentDraggingComponentConfig &&
              this.currentComponentId !== currentComponentId;
          }
        ),
        map((event: MouseEvent) => {
          const mouseTarget: HTMLElement = (event.target as HTMLElement);
          const isUiStudioDropContainer = mouseTarget.classList.contains('ui-studio-container');
          const isUiStudioComponent = mouseTarget.classList.contains('ui-studio-component');
          if (isUiStudioComponent) {
            return mouseTarget;
          } else if (isUiStudioDropContainer) {
            const parentId = mouseTarget.id.split('_')[0];
            return document.getElementById(parentId);
          }
          return null;
        }),
        filter(
          (currentTarget) => (this.currentComponentId !== currentTarget.id)
        )
      )
      .subscribe((currentTarget) => {
        if (this.currentComponentId !== currentTarget.id && this.actionButtons) {
          const actionButtons = this.actionButtons.nativeElement as HTMLElement;
          actionButtons.style.display = 'inline-block';
          actionButtons.style.top = currentTarget.getBoundingClientRect().top + 'px';
          actionButtons.style.left = currentTarget.getBoundingClientRect().left + 'px';
          actionButtons.style.marginLeft = currentTarget.classList.contains('is-container') ? '25px' : '5px';
          actionButtons.style.marginTop = '5px';
          this.currentComponentId = currentTarget.id;
        }
      });
  }

  hideActionButtons(event: MouseEvent = null) {
    if (this.actionButtons) {
      const actionButtons = this.actionButtons.nativeElement as HTMLElement;
      actionButtons.style.display = 'none';
      this.currentComponentId = null;
    }
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

      this.updateContainerElements(value, uiStudioElement);
      if (uifComponentConfig.isResponsive) {
        const column = this.uifComponentCreatorService.renderColumn(uifComponentConfig.defaultResponsiveWidth);
        column.append(uiStudioElement);
        column.classList.add('ui-studio-component');
        column.classList.add('is-container');
        column.id = value.id;
        parentContainer.append(column);
      } else {
        uiStudioElement.classList.add('ui-studio-component');
        uiStudioElement.classList.add('is-component');
        uiStudioElement.id = value.id;
        parentContainer.append(uiStudioElement);
      }
    });
  }

  fitToParent(element) {
    element.style.width = element.parentElement.clientWidth + 'px';
    element.style.height = element.parentElement.clientHeight + 'px';
  }

  deleteCurrentComponent() {
    const actionButtons = this.actionButtons.nativeElement as HTMLElement;
    actionButtons.style.display = 'none';
    setTimeout(() => {
      const isConfirmed = confirm('Are you sure! Do you want to delete?');
      if (isConfirmed) {
        this.currentPageUiStudioComponent = this.currentPageUiStudioComponent.filter(
          value => (value.id != this.currentComponentId)
        ).filter(
          value => (value.parentId != this.currentComponentId)
        );
        this.currentPageUiStudioComponent.forEach(
          (value, index) => value.position = index
        );
        this.currentComponentId = null;
        this.hideActionButtons();
        this.refreshCurrentPage();
      }
    }, 50);
  }

  moveComponent(moveButton: HTMLButtonElement, event: MouseEvent) {
    const draggableElement = document.getElementById(this.currentComponentId);
    this.hideActionButtons();
    document.body.append(draggableElement);
    draggableElement.classList.add('draggable');
    const xValue = event.clientX - 20;
    const yValue = event.clientY - 20;
    draggableElement.style.left = xValue + 'px';
    draggableElement.style.top = yValue + 5 + 'px';
    document.body.classList.add('no-select');
    draggableElement.style.pointerEvents = 'none';
    this.startUiStudioComponentDrag(draggableElement);
    this.dragAndDropService.currentDraggingComponent = draggableElement;
    this.dragAndDropService.isNewComponent = false;
    this.dragAndDropService.isExistingComponent = true;
  }

  startUiStudioComponentDrag(draggableElement: HTMLElement) {
    const draggingAndStopSubscription: Subscription = draggingAndStop$.subscribe((event: MouseEvent) => {
      const xValue = event.clientX - 20;
      const yValue = event.clientY - 20;
      draggableElement.style.left = xValue + 'px';
      draggableElement.style.top = yValue + 5 + 'px';
      document.body.classList.add('no-select');
    });
    const dragEndSubscription: Subscription = dragEnd$.subscribe(value => {
      draggingAndStopSubscription.unsubscribe();
      dragEndSubscription.unsubscribe();
      document.body.classList.remove('no-select');
      setTimeout(() => {
        // todo: remove below 3 lines once move functionality is completed
        this.dragAndDropService.currentDraggingComponent = null;
        this.dragAndDropService.isNewComponent = null;
        this.dragAndDropService.isExistingComponent = null;
        draggableElement.style.pointerEvents = 'all';
        draggableElement.remove();
        this.refreshCurrentPage();
      }, 50);
    });
  }
}
