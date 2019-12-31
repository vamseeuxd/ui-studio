import {Component} from '@angular/core';
import {ManageUifGroupsService} from '../../services/manage-uif-groups/manage-uif-groups.service';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';
import {UifComponentCreatorService} from '../../services/uif-component-creator/uif-component-creator.service';
import {dragEnd$, draggingAndStop$, uiStudioStageId} from '../../utils/drag-and-drop-utils';
import {Subscription} from 'rxjs';
import {DefaultCssUnitEnum} from '../../utils/default-css-unit.enum';
import {DragAndDropService} from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'ui-studio-left-side-panel-container',
  templateUrl: './ui-studio-left-side-panel-container.component.html',
  styleUrls: ['./ui-studio-left-side-panel-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UiStudioLeftSidePanelContainer {

  // uifComponentsList$ = this.uifComponentsListService.uifComponentsListAction$;
  uifComponentsList$ = this.manageUifGroupsService.uifComponentGroupsAction$;

  constructor(
    private manageUifGroupsService: ManageUifGroupsService,
    private uifComponentCreatorService: UifComponentCreatorService,
    private dragAndDropService: DragAndDropService,
  ) {
  }

  startDragHandler($event: { option: UifComponentConfigInterface, event: MouseEvent }) {
    $event.event.stopImmediatePropagation();
    const draggableElement = this.addUiStudioComponentToPage($event);
    this.startUiStudioComponentDrag(draggableElement);
    this.dragAndDropService.currentDraggingComponent = draggableElement;
    this.dragAndDropService.currentDraggingComponentConfig = $event.option;
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
      // draggableElement.style.pointerEvents = 'all';
      document.body.classList.remove('no-select');
      setTimeout(() => {
        draggableElement.remove();
      }, 50);
    });
  }

  addUiStudioComponentToPage($event: { option: UifComponentConfigInterface, event: MouseEvent }) {
    const draggableElement: HTMLElement = this.uifComponentCreatorService.renderComponentFromJson($event.option);
    draggableElement.classList.add('draggable');
    draggableElement.classList.add('ui-studio-component');
    draggableElement.id = $event.option.id;
    draggableElement.style.pointerEvents = 'none';
    draggableElement.style.top = $event.event.clientY - 15 + 'px';
    draggableElement.style.left = $event.event.clientX - 15 + 'px';
    if ($event.option.isResponsive) {
      const uiStudioStage = document.getElementById(uiStudioStageId);
      if (uiStudioStage) {
        const columnWidth = uiStudioStage.clientWidth / 12;
        const noOfColumns = Number($event.option.defaultResponsiveWidth.split('-')[1]);
        draggableElement.style.width = (noOfColumns * columnWidth) - 30 + 'px';
      }
    } else {
      if ($event.option.defaultWidthUnit !== DefaultCssUnitEnum.AUTO) {
        draggableElement.style.width = $event.option.defaultWidth + $event.option.defaultWidthUnit;
      }
    }
    document.body.append(draggableElement);
    return draggableElement;
  }
}
