import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UifComponentGroup, UifComponentGroupSource} from '../../models/uif-component-group.model';
import * as _ from 'lodash';
import {UifComponentConfigInterface} from '../../components/uif-component-creator/uif-component-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ManageUifGroupsService {

  private uifComponentList: UifComponentConfigInterface[] = [];
  private uifComponentGroupList: UifComponentGroupSource = {
    data: [],
    idField: 'id',
    labelField: 'name'
  };
  private uifComponentGroupsSubject = new BehaviorSubject<UifComponentGroupSource>(this.uifComponentGroupList);
  public uifComponentGroupsAction$ = this.uifComponentGroupsSubject.asObservable();

  constructor() {
    this.getGroups();
  }

  private getComponents() {
    const uifComponentsStr = window.localStorage.getItem('uifComponents');
    if (uifComponentsStr && uifComponentsStr.trim().length > 0) {
      this.uifComponentList = JSON.parse(uifComponentsStr);
    }
  }

  getGroups() {
    this.getComponents();
    const uifComponentGroupsStr = window.localStorage.getItem('uifComponentGroups');
    if (uifComponentGroupsStr && uifComponentGroupsStr.trim().length > 0) {
      this.uifComponentGroupList.data = JSON.parse(uifComponentGroupsStr);
      this.uifComponentGroupList.data.forEach(group => {
        group.components = this.uifComponentList.filter(component => (component.componentGroup.id === group.id));
      });
      this.uifComponentGroupsSubject.next(this.uifComponentGroupList);
    }
  }

  addGroup(newGroupName: string) {
    const newGroup: UifComponentGroup = {id: new Date().getTime().toString(), name: newGroupName, components: [], isOpen: false};
    this.uifComponentGroupList.data.push(newGroup);
    window.localStorage.setItem('uifComponentGroups', JSON.stringify(this.uifComponentGroupList.data));
    this.getGroups();
  }

  updateGroup(newGroupName: string, id: string) {
    const groupToUpdate = this.uifComponentGroupList.data.find(uifGroup => (uifGroup.id === id));
    if (groupToUpdate) {
      groupToUpdate.name = newGroupName;
      window.localStorage.setItem('uifComponentGroups', JSON.stringify(this.uifComponentGroupList.data));
      this.getGroups();
    }
  }

  deleteGroups(id: string) {
    const groupToUpdate = this.uifComponentGroupList.data.find(uifGroup => (uifGroup.id === id));
    if (groupToUpdate) {
      this.uifComponentGroupList.data = this.uifComponentGroupList.data.filter(uifGroup => (uifGroup.id !== id));
      window.localStorage.setItem('uifComponentGroups', JSON.stringify(this.uifComponentGroupList.data));
      this.getGroups();
    }
  }

  private moveItem(from, to) {
    // remove `from` item and store it
    const f = this.uifComponentGroupList.data.splice(from, 1)[0];
    // insert stored item into position `to`
    this.uifComponentGroupList.data.splice(to, 0, f);
  }

  moveUp(id: string) {
    const index = _.findIndex(this.uifComponentGroupList.data, ['id', id]);
    this.moveItem(index, index - 1);
  }

  moveDown(id: string) {
    const index = _.findIndex(this.uifComponentGroupList.data, ['id', id]);
    this.moveItem(index, index + 1);
  }
}
