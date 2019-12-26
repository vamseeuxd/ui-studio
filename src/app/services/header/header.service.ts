import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IAppHeaderMenuItem} from '../../components/app-header/app-header-menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private menuList: IAppHeaderMenuItem[] = [
    {id: 'managePages', label: 'Manage Pages', icon: 'fa fa-file'},
    {id: 'settings', label: 'Settings', icon: 'fa fa-cog text-info'},
    {id: 'uIFComponent', label: 'Manage UIF Component', icon: 'fa fa-th text-primary'},
    {
      id: 'previewinDevice',
      label: 'Preview in Device',
      icon: 'fa fa-eye text-success text-white',
      isDropDownMenu: true,
      dropDownMenuData: [
        {id: 'lg', label: 'Large Screen (lg)', icon: 'mr-2 fa fa-desktop text-danger'},
        {id: 'md', label: 'Medium Screen (md)', icon: 'mr-2 fa fa-laptop text-primary'},
        {id: 'sm', label: 'Small Screen (sm)', icon: 'mr-2 fa fa-tablet text-success'},
        {id: 'xs', label: 'Extra Small Screen (xs)', icon: 'mr-2 fa fa-mobile text-warning'}
      ]
    },
    {id: 'clearCode', label: 'Clear Page', icon: 'fa fa-eraser text-danger'},
  ];
  private menuListSubject = new BehaviorSubject<IAppHeaderMenuItem[]>(this.menuList);
  menuListAction$ = this.menuListSubject.asObservable();

  constructor() {
  }
}
