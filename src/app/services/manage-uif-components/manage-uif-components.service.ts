import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ManageUifComponentsService {

  private uifComponentList: UifComponentConfigInterface[] = [];
  private uifComponentsSubject = new BehaviorSubject<UifComponentConfigInterface[]>(this.uifComponentList);
  public uifComponentsAction$ = this.uifComponentsSubject.asObservable();

  constructor() {
    this.getComponents();
  }

  getComponents() {
    const uifComponentsStr = window.localStorage.getItem('uifComponents');
    if (uifComponentsStr && uifComponentsStr.trim().length > 0) {
      this.uifComponentList = JSON.parse(uifComponentsStr);
      this.uifComponentsSubject.next(this.uifComponentList);
    }
  }

  addComponent(uifComponent: UifComponentConfigInterface) {
    uifComponent.id = new Date().getTime().toString();
    this.uifComponentList.push(uifComponent);
    window.localStorage.setItem('uifComponents', JSON.stringify(this.uifComponentList));
    this.getComponents();
  }

  updateComponent(uifComponent: UifComponentConfigInterface, id: string) {
    let componentToUpdate = this.uifComponentList.find(component => (component.id === id));
    if (componentToUpdate) {
      componentToUpdate = uifComponent;
      componentToUpdate.id = id;
      const itemIndex = this.uifComponentList.findIndex(component => (component.id === id));
      this.uifComponentList[itemIndex] = componentToUpdate;
      window.localStorage.setItem('uifComponents', JSON.stringify(this.uifComponentList));
      this.getComponents();
    }
  }

  deleteComponent(id: string) {
    const componentToUpdate = this.uifComponentList.find(uifComponent => (uifComponent.id === id));
    if (componentToUpdate) {
      this.uifComponentList = this.uifComponentList.filter(uifComponent => (uifComponent.id !== id));
      window.localStorage.setItem('uifComponents', JSON.stringify(this.uifComponentList));
      this.getComponents();
    }
  }

}
