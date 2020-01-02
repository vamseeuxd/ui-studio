import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {DeviceSimulatorService} from '../../services/device-simulator/device-simulator.service';
import {fromEvent, Subscription} from 'rxjs';
import {dragEnd$, dragStartAndDragStop$, uiStudioStageId} from '../../utils/drag-and-drop-utils';
import {DragAndDropService} from '../../services/drag-and-drop/drag-and-drop.service';
import {UifComponentCreatorService} from '../../services/uif-component-creator/uif-component-creator.service';
import {DefaultCssUnitEnum} from '../../utils/default-css-unit.enum';
import {debounceTime, filter, map} from 'rxjs/operators';
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
  @ViewChild('actionButtons', {static: false}) actionButtons;
  isPreview$ = this.deviceSimulatorService.isPreview$;
  private currentPageUiStudioComponent: UiStudioComponentModel[] = [
    {
      'uifComponentId': '1572346252536',
      'position': 0,
      'pageId': 'demo-page',
      'parentId': '1577930093884',
      'containerId': '1575944358768',
      'properties': [],
      'isSelected': false,
      'id': '1577930155265'
    },
    {
      'uifComponentId': '1572346282886',
      'position': 1,
      'pageId': 'demo-page',
      'parentId': '1577930093884',
      'containerId': '1575944347860',
      'properties': [],
      'isSelected': false,
      'id': '1577930152879'
    },
    {
      'uifComponentId': '1572345187510',
      'position': 2,
      'pageId': 'demo-page',
      'parentId': '1577930093884',
      'containerId': '1575944334788',
      'properties': [
        {
          'name': 'label',
          'id': '1577930147271_0',
          'value': 'Primary',
          'dataType': 'STRING'
        }
      ],
      'isSelected': false,
      'id': '1577930147271'
    },
    {
      'uifComponentId': '1575610734766',
      'position': 3,
      'pageId': 'demo-page',
      'parentId': null,
      'containerId': null,
      'properties': [],
      'isSelected': false,
      'id': '1577930093884'
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
    this.currentPageUiStudioComponent = [];
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
            debugger;
            parentId = mouseTarget.parentElement.classList.contains('ui-studio-page') ? null : mouseTarget.parentElement.id.split('_')[0];
            // todo : Set Container ID for ui-studio-container
            containerId = mouseTarget.parentElement.classList.contains('ui-studio-page') ? null : mouseTarget.parentElement.id.split('_')[1];
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
        debugger;
        if (newPosition < listToUpdate.length) {
          listToUpdate.push(uiStudioComponent);
          moveItem(listToUpdate.length - 1, newPosition, listToUpdate);
        } else {
          listToUpdate.push(uiStudioComponent);
        }
        listToUpdate.forEach((value, index) => value.position = index);
        this.refreshCurrentPage();
        this.dragAndDropService.currentDraggingComponent = null;
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
        if (this.currentComponentId !== currentTarget.id) {
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
    const actionButtons = this.actionButtons.nativeElement as HTMLElement;
    actionButtons.style.display = 'none';
    this.currentComponentId = null;
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
        /*this.removeActionButtonEventListeners();
        this.updatePageElements();
        this.addActionButtonEventListeners();*/
      }
    }, 50);
  }
}
