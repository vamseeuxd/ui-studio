import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UifComponentGroup, UifComponentGroupSource} from '../../models/uif-component-group.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ManageUifGroupsService {
  private uifComponentGroupList: UifComponentGroupSource = {
    data: [],
    idField: 'id',
    labelField: 'name'
  };
  private uifComponentGroupsSubject = new BehaviorSubject<UifComponentGroupSource>(this.uifComponentGroupList);
  public uifComponentGroupsAction$ = this.uifComponentGroupsSubject.asObservable();

  constructor(
  ) {
    this.getGroups();
    /*123*/
  }

  getGroups() {
    const uifComponentGroupsStr = window.localStorage.getItem('uifComponentGroups');
    if (uifComponentGroupsStr && uifComponentGroupsStr.trim().length > 0) {
      this.uifComponentGroupList.data = JSON.parse(uifComponentGroupsStr);
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
