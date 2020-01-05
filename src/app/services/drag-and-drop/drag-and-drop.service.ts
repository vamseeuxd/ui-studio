import {Injectable} from '@angular/core';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';
import {fromEvent, Observable, Subject, Subscription} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {UiStudioComponentsService} from '../ui-studio-components/ui-studio-components.service';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  currentDraggingComponent: HTMLElement;
  isNewComponent: boolean;
  isExistingComponent: boolean;
  currentDraggingComponentConfig: UifComponentConfigInterface = null;
  uiStudioComponentDrop$: Subject<Event> = new Subject<Event>();
  private uiStudioDragEvent$ = fromEvent(document, 'mousemove');
  private uiStudioDropEvent$ = fromEvent(document, 'mouseup');
  private currentPageId = 'demo-page';

  constructor(
    private uiStudioComponentsService: UiStudioComponentsService,
  ) {
  }

  startUiStudioComponentDrag(draggableElement: HTMLElement, isNewComponent: boolean, option: UifComponentConfigInterface): Observable<Event> {

    this.currentDraggingComponent = draggableElement;
    this.isNewComponent = isNewComponent;
    this.isExistingComponent = !isNewComponent;
    this.currentDraggingComponentConfig = option;
    const uiStudioDragAndDropEvent$ = this.uiStudioDragEvent$.pipe(takeUntil(this.uiStudioDropEvent$));
    const draggingAndStopSubscription: Subscription = uiStudioDragAndDropEvent$.subscribe((event: MouseEvent) => {
      const xValue = event.clientX - 20;
      const yValue = event.clientY - 20;
      draggableElement.style.left = xValue + 'px';
      draggableElement.style.top = yValue + 5 + 'px';
      document.body.classList.add('no-select');
    });
    const dragEndSubscription: Subscription = this.uiStudioDropEvent$.subscribe(value => {
      draggingAndStopSubscription.unsubscribe();
      dragEndSubscription.unsubscribe();
      this.uiStudioComponentDrop$.next(value);
      document.body.classList.remove('no-select');
      setTimeout(() => {
        this.currentDraggingComponent = null;
        this.isNewComponent = null;
        this.isExistingComponent = null;
        this.currentDraggingComponentConfig = null;
        draggableElement.remove();
      }, 50);

    });
    return this.uiStudioComponentDrop$;
  }

  emitUiStudioComponentDrop(canvas:HTMLElement) {
    this.uiStudioComponentDrop$.pipe(
      filter(
        (event: MouseEvent) => {
          return (
            (
              (event.target as HTMLElement).classList.contains('ui-studio-page') ||
              (event.target as HTMLElement).classList.contains('ui-studio-container') ||
              (event.target as HTMLElement).classList.contains('ui-studio-component')
            ) &&
            !!this.currentDraggingComponent
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
            position = canvas.childElementCount;
            parentId = null;
            containerId = null;
            if (this.isNewComponent) {
              uifComponentId = this.currentDraggingComponentConfig.id;
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
            if (this.isNewComponent) {
              uifComponentId = this.currentDraggingComponentConfig.id;
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
            if (this.isNewComponent) {
              uifComponentId = this.currentDraggingComponentConfig.id;
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
            isNewComponent: this.isNewComponent,
            isExistingComponent: this.isExistingComponent,
            moveComponentInfo: {
              position,
              parentId,
              containerId,
              id: this.currentDraggingComponent.id
            }
          };
          return objectToReturn;
        }
      ),
      filter(value => !!value)
    ).subscribe(
      ({newUiStudioComponent, isExistingComponent, isNewComponent, moveComponentInfo}) => {
        if (isNewComponent) {
          this.uiStudioComponentsService.addUiStudioComponent(newUiStudioComponent);
        } else if (isExistingComponent) {
          this.uiStudioComponentsService.moveUiStudioComponent(moveComponentInfo);
        }
      }
    );
  }
}
