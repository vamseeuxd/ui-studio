import {IAppHeaderDropDownMenuItem} from './app-header-drop-down-menu-item.interface';

export interface IAppHeaderMenuItem {
    id: string;
    label: string;
    icon?: string;
    isDropDownMenu?: boolean;
    dropDownMenuData?: IAppHeaderDropDownMenuItem[];
}