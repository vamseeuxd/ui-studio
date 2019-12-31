import {UiStudioComponentPropertyModel} from './ui-studio-component-property.model';

export class UiStudioComponentModel {

  public id: string;
  public properties: UiStudioComponentPropertyModel[] = [];
  public isSelected = false;

  constructor(
    public uifComponentId: string,
    public position: number,
    public pageId: string,
    public parentId: string,
    public containerId: string,
  ) {
    this.id = new Date().getTime().toString();
  }
}

