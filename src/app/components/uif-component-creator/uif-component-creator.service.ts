import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as convert from 'xml-js';
import {UifComponentConfigInterface} from './uif-component-config.interface';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class UifComponentCreatorService {

    private htmlTemplate = ``;
    public htmlTemplate$: BehaviorSubject<string> = new BehaviorSubject<string>(this.htmlTemplate);

    private htmlElement: HTMLElement;
    public htmlElement$: BehaviorSubject<HTMLElement> = new BehaviorSubject<HTMLElement>(this.htmlElement);

    private componentConfig: UifComponentConfigInterface;
    public componentConfig$: BehaviorSubject<any> = new BehaviorSubject<any>(this.componentConfig);

    private componentGroup: { id: string } = null;
    public componentGroup$: BehaviorSubject<{ id: string }> = new BehaviorSubject<{ id: string }>(this.componentGroup);

    private componentName = '';
    public componentName$: BehaviorSubject<string> = new BehaviorSubject<string>(this.componentName);

    private isResponsive = false;
    public isResponsive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isResponsive);

    private defaultResponsiveWidth = 'col-12';
    public defaultResponsiveWidth$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultResponsiveWidth);

    private defaultWidthUnit = '%';
    public defaultWidthUnit$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultWidthUnit);

    private defaultWidth: number = null;
    public defaultWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultWidth);

    constructor() {
    }

    public reset() {
        this.htmlTemplate = ``;
        this.htmlElement = null;
        this.componentConfig = null;
        this.componentGroup = null;
        this.componentName = '';
        this.isResponsive = false;
        this.defaultResponsiveWidth = 'col-12';
        this.defaultWidthUnit = '%';
        this.defaultWidth = null;

        this.htmlTemplate$.next(this.htmlTemplate);
        this.htmlElement$.next(this.htmlElement);
        this.componentConfig$.next(this.componentConfig);
        this.componentGroup$.next(this.componentGroup);
        this.componentName$.next(this.componentName);
        this.isResponsive$.next(this.isResponsive);
        this.defaultResponsiveWidth$.next(this.defaultResponsiveWidth);
        this.defaultWidthUnit$.next(this.defaultWidthUnit);
        this.defaultWidth$.next(this.defaultWidth);
    }

    public updateComponentName(componentName: string) {
        this.componentName = componentName;
        this.componentName$.next(this.componentName);
    }

    public updateIsResponsive(isResponsive: boolean) {
        this.isResponsive = isResponsive;
        this.isResponsive$.next(this.isResponsive);
    }

    public updateDefaultResponsiveWidth(defaultResponsiveWidth: string) {
        this.defaultResponsiveWidth = defaultResponsiveWidth;
        this.defaultResponsiveWidth$.next(this.defaultResponsiveWidth);
    }

    public updateDefaultWidthUnit(defaultWidthUnit: string) {
        this.defaultWidthUnit = defaultWidthUnit;
        this.defaultWidthUnit$.next(this.defaultWidthUnit);
        if (this.defaultWidthUnit === 'auto') {
            this.updateDefaultWidth(null);
        }
    }

    public updateDefaultWidth(defaultWidth: number) {
        this.defaultWidth = defaultWidth;
        this.defaultWidth$.next(this.defaultWidth);
    }

    public updateComponentGroup(componentGroupId: string) {
        this.componentGroup = {id: componentGroupId};
        this.componentGroup$.next(this.componentGroup);
    }

    public updateHtmlTemplate(htmlTemplate: string) {
        const templateString = this.removeWhiteSpaces(htmlTemplate);
        const templateStringToXml = convert.xml2js(this.refactorSelfColsedTags(templateString, '<input'));
        this.htmlTemplate = convert.js2xml(templateStringToXml, {compact: false, spaces: 4});
        const componentConfig = JSON.parse(this.getComponentConfig(htmlTemplate));
        this.updateComponentConfig(componentConfig);
        this.htmlTemplate$.next(this.htmlTemplate);
    }

    private refactorSelfColsedTags(fullStr, searchTag): string {
        if (fullStr.indexOf(searchTag) < 0) {
            return fullStr;
        }
        let stop = false;
        let startSearchIndex = 0;
        let finalStr;

        while (stop === false) {
            const startIndexOfSearchTag = fullStr.indexOf(searchTag, startSearchIndex);
            if (startIndexOfSearchTag === -1) {
                stop = true;
                break;
            }
            const indexOfClosetagOfSearchTag = fullStr.indexOf('>', startIndexOfSearchTag);
            const lastButOneCharOfClosetag = fullStr[indexOfClosetagOfSearchTag - 1];
            if (lastButOneCharOfClosetag !== '/') {
                finalStr = fullStr.substring(0, indexOfClosetagOfSearchTag) + '/' + fullStr.substring(indexOfClosetagOfSearchTag, fullStr.length);
            }
            if (finalStr) {
                fullStr = finalStr;
            }
            startSearchIndex = startIndexOfSearchTag + 1;
        }
        return finalStr ? finalStr : fullStr;
    }


    public updateComponentConfig(componentConfig: any) {
        this.componentConfig = componentConfig;
        this.updateHtmlElement(componentConfig);
        this.componentConfig$.next(this.componentConfig);
    }

    private updateHtmlElement(componentConfig) {
        this.htmlElement = this.renderComponentFromJson(componentConfig);
        this.htmlElement$.next(this.htmlElement);
        const tempParent: HTMLElement = document.createElement('div');
        tempParent.append(this.htmlElement);
        const htmlToString = convert.xml2js(this.refactorSelfColsedTags(tempParent.innerHTML, '<input'));
        this.htmlTemplate = convert.js2xml(htmlToString, {compact: false, spaces: 4});
        this.htmlTemplate$.next(this.htmlTemplate);
    }

    // noinspection JSMethodCanBeStatic
    private removeWhiteSpaces(htmlString) {
        let htmlText = htmlString.replace(/(\r\n|\n|\r)/gm, ' ');
        htmlText = htmlText.split('  ').join('');
        htmlText = htmlText.split('> <').join('><');
        return htmlText;
    }

    private getComponentConfig(htmlDomString) {
        const options = {ignoreComment: true, alwaysChildren: true};
        const result = convert.xml2js(this.refactorSelfColsedTags(htmlDomString, '<input'));
        this.addIsContainerProperty(result.elements[0]);
        this.addProperties(result.elements[0]);
        return JSON.stringify(result.elements[0], null, 2).trim();
    }

    private addIsContainerProperty(element) {
        if (element.type === 'element') {
            element.isContainer = false;
            element.repeatable = false;
            element.repeatCount = 1;
            element.tag = element.name;
            delete element.name;
            delete element.type;
        }

        if (element.hasOwnProperty('elements')) {
            for (const option of element.elements) {
                this.addIsContainerProperty(option);
            }
        }
    }

    private addProperties(element) {
        if (element.hasOwnProperty('attributes')) {
            element.properties = [];
            Object.keys(element.attributes).forEach(attribute => {
                element.properties.push({
                    name: attribute,
                    value: element.attributes[attribute],
                    isAttribute: true,
                    dataType: 'STRING',
                    isOpen: false,
                    isEditable: false
                });
            });
            delete element.attributes;
        }
        if (element.hasOwnProperty('elements')) {
            for (let i = element.elements.length - 1; i >= 0; i--) {
                if (element.elements[i].type === 'text') {
                    if (!element.hasOwnProperty('properties')) {
                        element.properties = [];
                    }
                    element.properties.push({
                        name: 'innerText',
                        value: element.elements[i].text,
                        isAttribute: false,
                        dataType: 'STRING',
                        isEditable: false
                    });
                    element.elements.splice(i, 1);
                }
            }
        }
        if (element.hasOwnProperty('elements')) {
            element.elements.forEach(newElement => {
                this.addProperties(newElement);
            });
            if (element.elements.length === 0) {
                delete element.elements;
            } else {
                element.children = element.elements;
                delete element.elements;
            }
        }
    }

    renderRow(): HTMLElement {
        const htmlElement: HTMLElement = document.createElement('div');
        htmlElement.classList.add('row');
        return htmlElement;
    }

    renderColumn(size = 'col-12', marginBottom = 'mb-2'): HTMLElement {
        const htmlElement: HTMLElement = document.createElement('div');
        htmlElement.classList.add(size);
        htmlElement.classList.add(marginBottom);
        return htmlElement;
    }

    renderComponentFromJson(config: any): HTMLElement {
        const htmlElement: HTMLElement = document.createElement(config.tag);
        if (config.hasOwnProperty('properties')) {
            for (const prop of config.properties) {
                if (prop.isAttribute) {
                    htmlElement.setAttribute(prop.name, prop.value);
                } else {
                    htmlElement[prop.name] = prop.value.trim();
                }
            }
        }

        if (config.isContainer) {
            htmlElement.classList.add('drop-container');
            htmlElement.id = config.containerId;
        }

        if (config.hasOwnProperty('children')) {
            config.children.forEach(child => {
                if (child.repeatable) {
                    for (let j = 0; j < child.repeatCount; j++) {
                        const childElement = this.renderComponentFromJson(child);
                        childElement.classList.add('repeated-item');
                        htmlElement.appendChild(childElement);
                    }
                } else {
                    const childElement = this.renderComponentFromJson(child);
                    htmlElement.appendChild(childElement);
                }
            });
        }
        return htmlElement;
    }
}
