import {Injectable} from '@angular/core';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  currentDraggingComponent: HTMLElement;
  isNewComponent: boolean;
  isExistingComponent: boolean;
  currentDraggingComponentConfig: UifComponentConfigInterface = null;

  constructor() {
  }
}
