import {Injectable} from '@angular/core';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';
import {fromEvent, Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  currentDraggingComponent: HTMLElement;
  isNewComponent: boolean;
  isExistingComponent: boolean;
  currentDraggingComponentConfig: UifComponentConfigInterface = null;
  uiStudioComponentDrop$: Subject<Event> = new Subject<Event>();

  constructor() {
  }

  startUiStudioComponentDrag(draggableElement: HTMLElement, isNewComponent: boolean, option: UifComponentConfigInterface): Observable<Event> {

    this.currentDraggingComponent = draggableElement;
    this.isNewComponent = isNewComponent;
    this.isExistingComponent = !isNewComponent;
    this.currentDraggingComponentConfig = option;

    const uiStudioDragEvent$ = fromEvent(document, 'mousemove');
    const uiStudioDropEvent$ = fromEvent(document, 'mouseup');
    const uiStudioDragAndDropEvent$ = uiStudioDragEvent$.pipe(takeUntil(uiStudioDropEvent$));
    const draggingAndStopSubscription: Subscription = uiStudioDragAndDropEvent$.subscribe((event: MouseEvent) => {
      const xValue = event.clientX - 20;
      const yValue = event.clientY - 20;
      draggableElement.style.left = xValue + 'px';
      draggableElement.style.top = yValue + 5 + 'px';
      document.body.classList.add('no-select');
    });
    const dragEndSubscription: Subscription = uiStudioDropEvent$.subscribe(value => {
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
}
