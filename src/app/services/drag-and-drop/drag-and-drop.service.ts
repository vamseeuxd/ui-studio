import {Injectable} from '@angular/core';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  currentDraggingComponent: HTMLElement;
  currentDraggingComponentConfig: UifComponentConfigInterface = null;

  constructor() {
  }
}
