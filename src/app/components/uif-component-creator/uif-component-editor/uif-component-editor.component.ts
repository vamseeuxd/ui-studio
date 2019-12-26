import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModelEntity, UifComponentConfigInterface} from '../uif-component-config.interface';

@Component({
    selector: 'ui-studio-uif-component-editor',
    templateUrl: './uif-component-editor.component.html',
    styleUrls: ['./uif-component-editor.component.scss']
})
export class UifComponentEditorComponent {
  // tslint:disable-next-line:variable-name
    private _componentConfig: UifComponentConfigInterface;

    get componentConfig(): UifComponentConfigInterface {
        return this._componentConfig;
    }

    @Input()
    set componentConfig(value: UifComponentConfigInterface) {
        if (value) {
            value.isValid = this.isValid(value);
        }
        this._componentConfig = value;
    }

    @Input() rootConfig: any;
    @Input() open = true;
    // noinspection JSUnusedGlobalSymbols
    showProperties = false;
    @Input() isRoot = true;
    @Output() componentConfigChange: EventEmitter<any> = new EventEmitter<any>();
    currentTab = 0;

    getTitle(componentConfig) {
        if (componentConfig) {
            const cssClassName = this.getCssClassName(componentConfig);

            if (cssClassName) {
                return componentConfig.tag + '.' + cssClassName.split(' ').join('.');
            } else {
                return componentConfig.tag;
            }
        }
    }

    isPropertyNameValid(propertyName: string): boolean {
        return (
            propertyName && propertyName.trim().length > 2) ?
            (propertyName.match(/^[a-z0-9 ]+$/i) != null) :
            false;
    }

    isValid(componentConfig: UifComponentConfigInterface) {
        let isValid = true;
        componentConfig.properties.filter(prop => prop.isEditable).forEach(prop => {
            if (
                !(
                    prop.hasOwnProperty('propertyName') &&
                    this.isPropertyNameValid(prop.propertyName) &&
                    !this.isDuplicatePropertyName(prop.propertyName, prop.propertyId)
                )
            ) {
                isValid = false;
            }
        });
        if (this.isAnyChildrenAvailable(componentConfig)) {
            componentConfig.children.forEach(child => {
                if (!this.isValid(child)) {
                    isValid = false;
                }
            });
        }
        return isValid;
    }

    isDuplicatePropertyName(propertyName: string, propertyId: string): boolean {
        if (!propertyName || !this.componentConfig) {
            return false;
        }
        if (this.isRoot) {
            const duplicateProps = this.componentConfig.model.filter(
                prop => (prop.propertyId !== propertyId)
            ).filter(
                prop => (prop.propertyId === this.convertToCamelCase(propertyName.trim()))
            );
            return duplicateProps.length > 0;
        } else {
            const duplicateProps = this.rootConfig.model.filter(
                prop => (prop.propertyId !== propertyId)
            ).filter(
                prop => (prop.propertyId === this.convertToCamelCase(propertyName.trim()))
            );
            return duplicateProps.length > 0;
        }
    }

    getModelObject(componentConfig: UifComponentConfigInterface, isRootElement: boolean, modelObject: any[]): any {
        let rootModelObject = [];
        if (!isRootElement) {
            rootModelObject = modelObject;
        }
        componentConfig.properties.filter(prop => prop.isEditable).forEach(prop => {
            if (
                (
                    prop.hasOwnProperty('propertyName') &&
                    this.isPropertyNameValid(prop.propertyName) &&
                    !this.isDuplicatePropertyName(prop.propertyName, prop.propertyId)
                )
            ) {
                prop.propertyId = this.convertToCamelCase(prop.propertyName);
                const propModelInfo: ModelEntity = {
                    propertyName: prop.propertyName.trim(),
                    propertyId: this.convertToCamelCase(prop.propertyName),
                    propertyValue: prop.value,
                    propertyDataType: prop.dataType
                };
                rootModelObject.push(propModelInfo);
            }
        });
        if (this.isAnyChildrenAvailable(componentConfig)) {
            componentConfig.children.forEach(child => {
                rootModelObject = this.getModelObject(child, false, rootModelObject);
            });
        }
        return rootModelObject;
    }

    convertToCamelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
            if (+match === 0) {
                return '';
            }
            // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    onValueChange() {
        setTimeout(() => {
            this.componentConfig.containerId = new Date().getTime().toString();
            if (this.componentConfig) {
                this.componentConfig.isValid = this.isValid(this.componentConfig);
            }
            this.componentConfig.model = this.getModelObject(this.componentConfig, true, []);
            this.componentConfigChange.emit(this.componentConfig);
        });
    }

    deleteProperty(properties, $index) {
        const isConfirm = confirm(
            'Are you sure! Do you want to delete this Property'
        );
        if (isConfirm) {
            properties.splice($index, 1);
            this.componentConfigChange.emit(this.componentConfig);
        }
    }

    isAnyPropertiesAvailable(componentConfig: UifComponentConfigInterface): boolean {
        return componentConfig.properties && componentConfig.properties.length > 0;
    }

    isAnyChildrenAvailable(componentConfig: UifComponentConfigInterface): boolean {
        return componentConfig.children && componentConfig.children.length > 0;
    }

    mergeRepeatedElements(componentConfig, rootConfig) {
        const isConfirmed = confirm('Are you sure! would you like to merge and repeat dynamically?');
        if (isConfirmed && rootConfig) {
            componentConfig.repeatable = true;
            componentConfig.repeatCount = this.getDuplicateChildCount(componentConfig, rootConfig);
            const mainTittle = this.getTitle(componentConfig);
            for (let i = (rootConfig.children.length - 1); i >= 0; i--) {
                const adjacentTitle = this.getTitle(rootConfig.children[i]);
                if (
                    rootConfig.children[i] !== componentConfig &&
                    adjacentTitle === mainTittle
                ) {
                    rootConfig.children.splice(i, 1);
                }
            }
            this.onValueChange();
        }
    }

    getDuplicateChildCount(componentConfig, rootConfig) {
        if (rootConfig) {
            const mainTittle = this.getTitle(componentConfig);
            const duplicateItems = rootConfig.children.filter(el => {
                const adjacentTitle = this.getTitle(el);
                return adjacentTitle === mainTittle;
            });
            return duplicateItems.length;
        } else {
            return 0;
        }
    }

    // noinspection JSMethodCanBeStatic
    getCssClassName(componentConfig): string {
        if (componentConfig && componentConfig.properties) {
            const cssClassNameArr = componentConfig.properties.filter(
                prop => prop.name === 'class'
            );
            if (cssClassNameArr && cssClassNameArr.length === 1) {
                return cssClassNameArr[0].value;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

}
