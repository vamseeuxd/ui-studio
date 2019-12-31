import {fromEvent} from 'rxjs';
import {filter, flatMap, map, sample, switchMap, takeUntil, tap} from 'rxjs/operators';

const dragStart$ = fromEvent(document, 'mousedown');
const dragging$ = fromEvent(document, 'mousemove');
const dragEnd$ = fromEvent(document, 'mouseup');
const dragStartAndDragStop$ = dragStart$.pipe(takeUntil(dragEnd$));
const draggingAndStop$ = dragging$.pipe(takeUntil(dragEnd$));
const dragStartAndDragging$ = dragStart$.pipe(
  flatMap(
    (md: MouseEvent) => {
      const startX = md.offsetX;
      const startY = md.offsetY;
      return dragging$.pipe(
        map(
          (mm: MouseEvent) => {
            mm.preventDefault();
            return {
              left: mm.clientX - startX,
              top: mm.clientY - startY
            };
          }
        )
      ).pipe(
        takeUntil(dragEnd$)
      );
    }
  )
);

const uiStudioStageId = 'ui-studio-page';
// const uiStudioStage: HTMLElement = document.getElementById('ui-studio-page');

export {dragStart$, dragging$, dragEnd$, draggingAndStop$, dragStartAndDragging$, uiStudioStageId, dragStartAndDragStop$};
