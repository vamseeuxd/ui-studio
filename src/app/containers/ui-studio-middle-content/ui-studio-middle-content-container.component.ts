import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {DeviceSimulatorService} from '../../services/device-simulator/device-simulator.service';
import {Subscription} from 'rxjs';
import {DragAndDropService} from '../../services/drag-and-drop/drag-and-drop.service';
import {UifComponentCreatorService} from '../../services/uif-component-creator/uif-component-creator.service';
import {UiStudioComponentsService} from '../../services/ui-studio-components/ui-studio-components.service';
import {UiStudioComponentModel} from '../../models/ui-studio-component.model';
import {ManageUifGroupsService} from '../../services/uif-components/manage-uif-groups/manage-uif-groups.service';
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
  private currentPageUiStudioComponent: UiStudioComponentModel[] = [];
  private currentPageId = 'demo-page';
  private mouseOverComponentId = null;
  private currentComponent: UiStudioComponentModel = null;

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
    setTimeout(() => {
      this.fitToParent(this.uiStudioPage.nativeElement);
      this.uiStudioPage.nativeElement.classList.add('animation');
      this.dragAndDropService.emitUiStudioComponentDrop(this.canvas.nativeElement);
      this.uiStudioComponentsService.uiStudioComponentsListAction$.subscribe(value => {
        this.currentPageUiStudioComponent = value;
        this.hideActionButtons();
        this.refreshCurrentPage();
      });
    });
  }

  refreshCurrentPage() {
    this.removeActionButtonEventListeners();
    this.updatePageElements();
    this.addActionButtonEventListeners();
    setTimeout(() => {
      this.hideActionButtons();
    }, 55);
  }

  removeActionButtonEventListeners() {
    Array.from(document.getElementsByClassName('ui-studio-component')).forEach((value, index) => {
      value.removeEventListener('mouseover', this.showActionButton.bind(this));
    });
  }

  addActionButtonEventListeners() {
    Array.from(document.getElementsByClassName('ui-studio-component')).forEach((value, index) => {
      value.addEventListener('mouseover', this.showActionButton.bind(this));
    });
  }

  showActionButton(event: MouseEvent) {
    event.stopPropagation();
    const currentTarget: HTMLElement = (event.currentTarget as HTMLElement);
    if (this.mouseOverComponentId !== currentTarget.id && this.actionButtons) {
      const actionButtons = this.actionButtons.nativeElement as HTMLElement;
      actionButtons.style.display = 'inline-block';
      actionButtons.style.top = currentTarget.getBoundingClientRect().top + 'px';
      actionButtons.style.left = currentTarget.getBoundingClientRect().left + 'px';
      actionButtons.style.marginLeft = currentTarget.classList.contains('is-container') ? '25px' : '5px';
      actionButtons.style.marginTop = '5px';
      this.mouseOverComponentId = currentTarget.id;
      const handleMouseOut = (event: MouseEvent) => {
        const bondingRect = currentTarget.getBoundingClientRect();
        if (
          !((event.clientX > bondingRect.left) &&
            (event.clientX < (bondingRect.left + bondingRect.width)) &&
            (event.clientY > bondingRect.top) &&
            (event.clientY < (bondingRect.top + bondingRect.height)))
        ) {
          this.hideActionButtons();
          currentTarget.removeEventListener('mouseleave', handleMouseOut.bind(this), true);
          actionButtons.removeEventListener('mouseleave', handleMouseOut.bind(this), true);
        }
      };
      currentTarget.addEventListener('mouseout', handleMouseOut.bind(this), true);
      actionButtons.addEventListener('mouseout', handleMouseOut.bind(this), true);
    }
  }

  hideActionButtons(event: MouseEvent = null) {
    if (this.actionButtons) {
      const actionButtons = this.actionButtons.nativeElement as HTMLElement;
      actionButtons.style.display = 'none';
      this.mouseOverComponentId = null;
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
        this.uiStudioComponentsService.deleteUiStudioComponent(this.mouseOverComponentId);
        this.mouseOverComponentId = null;
        this.currentComponent = null;
        this.hideActionButtons();
      }
    }, 50);
  }

  editComponent() {
    if (this.mouseOverComponentId) {
      this.currentComponent = this.currentPageUiStudioComponent.find(value => (value.id == this.mouseOverComponentId));
    }
  }

  moveComponent(moveButton: HTMLButtonElement, event: MouseEvent) {
    const draggableElement = document.getElementById(this.mouseOverComponentId);
    this.removeActionButtonEventListeners();
    this.hideActionButtons();
    document.body.append(draggableElement);
    draggableElement.classList.add('draggable');
    const xValue = event.clientX - 20;
    const yValue = event.clientY - 20;
    draggableElement.style.left = xValue + 'px';
    draggableElement.style.top = yValue + 5 + 'px';
    draggableElement.style.pointerEvents = 'none';
    const dragAndDropSubscription: Subscription = this.dragAndDropService.startUiStudioComponentDrag(draggableElement, false, null).subscribe(value => {
      dragAndDropSubscription.unsubscribe();
      this.hideActionButtons();
      this.refreshCurrentPage();
    });
  }
}
