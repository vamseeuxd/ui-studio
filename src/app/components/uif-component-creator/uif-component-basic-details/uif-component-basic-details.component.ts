import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {UifComponentCreatorService} from '../../../services/uif-component-creator/uif-component-creator.service';
import {DefaultCssUnitEnum} from '../../../utils/default-css-unit.enum';

@Component({
    selector: 'ui-studio-uif-component-basic-details',
    templateUrl: './uif-component-basic-details.component.html',
    styleUrls: ['./uif-component-basic-details.component.scss']
})
export class UifComponentBasicDetailsComponent {

    /*  ---------------------- UIF Group ----------------------   */
    @Input() uifGroupDataSource: { data: any[], idField: string, labelField: string } = {data: [], idField: 'id', labelField: 'label'};
    isUifGroupDropDownOpen = false;
    @Input() editingUifGroupItem = null;
    @Input() newComponentGroup = '';
    @Output() addGroup: EventEmitter<string> = new EventEmitter<string>();
    @Output() removeGroup: EventEmitter<any> = new EventEmitter<any>();
    @Output() moveGroupUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() moveGroupDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() editGroup: EventEmitter<{ item: any; [key: string]: string }> = new EventEmitter<{ item: any; [key: string]: string }>();
    selectedUifGroupItem: any = null;
    @Output() componentGroupsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    /*  ---------------------- UIF Group ----------------------   */

    @HostBinding('class') className = 'p-3 col-12 border border-top-0 d-block';
    @Input() isDuplicateComponent?: (componentName: string) => boolean;
    componentName = '';
    isResponsive = false;
    defaultWidthUnit = DefaultCssUnitEnum.AUTO;
    defaultWidth: number = null;
    defaultResponsiveWidth = 'col-12';

    // noinspection JSUnusedGlobalSymbols
    get isValid(): boolean {
        return !this.isComponentNameExists(this.componentName) &&
            this.isComponentNameValid(this.componentName) &&
            this.componentName.trim().length > 0 &&
            (this.isResponsive ? true : ((this.defaultWidthUnit === 'auto') ? true : (this.defaultWidth > 0))) &&
            !!this.selectedUifGroupItem;
    }

    // noinspection JSMethodCanBeStatic
    toCamelCase(str) {
        return str
            .replace(/\s(.)/g, ($1) => {
                return $1.toUpperCase();
            })
            .replace(/\s/g, '')
            .replace(/^(.)/, ($1) => {
                return $1.toLowerCase();
            });
    }

    constructor(public service: UifComponentCreatorService) {
        this.service.componentGroup$.subscribe(value => {
            this.selectedUifGroupItem = null;
            if (value !== null && value !== undefined) {
                this.uifGroupDataSource.data.forEach(group => {
                    if (group.id === value.id) {
                        this.selectedUifGroupItem = group;
                    }
                });
            }
        });
        this.service.componentName$.subscribe(value => {
            this.componentName = value;
        });
        this.service.isResponsive$.subscribe(value => {
            this.isResponsive = value;
        });
        this.service.defaultResponsiveWidth$.subscribe(value => {
            this.defaultResponsiveWidth = value;
        });
        this.service.defaultWidthUnit$.subscribe(value => {
            this.defaultWidthUnit = value;
        });
        this.service.defaultWidth$.subscribe(value => {
            this.defaultWidth = value;
        });
    }

    isComponentNameExists(componentName: string): boolean {
        if (this.isDuplicateComponent) {
            return this.isDuplicateComponent(componentName);
        } else {
            return false;
        }
    }


    isComponentNameValid(componentName: string): boolean {
        return (componentName.trim().length > 0) ? componentName.match(/^[a-z0-9 ]+$/i) != null : true;
    }

    // noinspection JSUnusedGlobalSymbols
    isBasicDetailsValid(): boolean {
        return this.componentName.trim().length > 0 && !!this.selectedUifGroupItem;
    }

    /*  ---------------------- UIF Group ----------------------   */

    addUifGroupItem(newItem: string) {
        this.addGroup.emit(newItem);
    }

    deleteUifGroupItem(option: any) {
        this.removeGroup.emit(option);
    }

    updateUifGroupItem($event: { item: any; [key: string]: string }) {
        this.editGroup.emit($event);
        this.uifGroupDataSource.data = this.uifGroupDataSource.data.map(data => {
            if (data[this.uifGroupDataSource.idField] === $event.item[this.uifGroupDataSource.idField]) {
                data[this.uifGroupDataSource.labelField] = $event[this.uifGroupDataSource.labelField];
                return data;
            } else {
                return data;
            }
        });
        this.editingUifGroupItem = null;
    }

    moveUifGroupItemToUp($event: any) {
        this.moveGroupUp.emit($event);
    }

    moveUifGroupItemToDown($event: any) {
        this.moveGroupDown.emit($event);
    }

    /*  ---------------------- UIF Group ----------------------   */

}
