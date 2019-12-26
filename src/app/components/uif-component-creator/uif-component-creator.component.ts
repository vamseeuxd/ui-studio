import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {UifComponentCreatorService} from './uif-component-creator.service';
import {UifComponentBasicDetailsComponent} from './uif-component-basic-details/uif-component-basic-details.component';
import {UifComponentAddTemplateComponent} from './uif-component-add-template/uif-component-add-template.component';

@Component({
  selector: 'ui-studio-uif-component-creator',
  templateUrl: './uif-component-creator.component.html',
  styleUrls: ['./uif-component-creator.component.scss'],
  providers: [
    UifComponentCreatorService
  ]
})
export class UifComponentCreatorComponent {

  @ViewChild('basicDetails', {static: false}) basicDetailsComponent: UifComponentBasicDetailsComponent;
  @ViewChild('addTemplateComponent', {static: false}) addTemplateComponent: UifComponentAddTemplateComponent;

  resetFlag = true;

  @Input() uifGroupDataSource: { data: any[], idField: string, labelField: string } = {data: [], idField: 'id', labelField: 'label'};

  @Output() componentGroupsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output() addGroup: EventEmitter<string> = new EventEmitter<string>();

  @Output() removeGroup: EventEmitter<any> = new EventEmitter<any>();

  @Output() moveGroupUp: EventEmitter<any> = new EventEmitter<any>();

  @Output() moveGroupDown: EventEmitter<any> = new EventEmitter<any>();

  @Output() editGroup: EventEmitter<{ item: any; [key: string]: string }> = new EventEmitter<{ item: any; [key: string]: string }>();

  @Input() editingUifGroupItem = null;

  @Input() saveButtonLabel = 'Save';

  @Input() isBasicDetails = true;

  @Input() newComponentGroup = '';

  @Input() isDuplicateComponent?: (componentName: string) => boolean;

  @Output() create: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  showFooter = true;

  private componentConfig = {};

  constructor(private service: UifComponentCreatorService) {
    this.service.componentConfig$.subscribe(value => {
      this.componentConfig = null;
      setTimeout(() => {
        this.componentConfig = value;
      });
    });
  }

  update(componentConfig: any) {
    this.showFooter = false;

    setTimeout(() => {
      this.showFooter = true;
    });
    // componentConfig.model = [];
    this.service.updateComponentConfig(componentConfig);

    if (componentConfig.hasOwnProperty('componentName')) {
      this.service.updateComponentName(componentConfig.componentName);
    }

    if (componentConfig.hasOwnProperty('componentGroup')) {
      this.service.updateComponentGroup(componentConfig.componentGroup.id);
    }

    if (componentConfig.hasOwnProperty('isResponsive')) {
      this.service.updateIsResponsive(componentConfig.isResponsive);
    }

    if (componentConfig.hasOwnProperty('defaultResponsiveWidth')) {
      this.service.updateDefaultResponsiveWidth(componentConfig.defaultResponsiveWidth);
    }

    if (componentConfig.hasOwnProperty('defaultWidth')) {
      this.service.updateDefaultWidth(componentConfig.defaultWidth);
    }

    if (componentConfig.hasOwnProperty('defaultWidthUnit')) {
      this.service.updateDefaultWidthUnit(componentConfig.defaultWidthUnit);
    }
  }

  resetNewGroup() {
    this.basicDetailsComponent.newComponentGroup = '';
  }

  // noinspection JSUnusedGlobalSymbols
  reset() {
    this.resetFlag = false;
    this.isBasicDetails = false;
    setTimeout(() => {
      this.resetFlag = true;
      this.service.reset();
      this.isBasicDetails = true;
    });
  }

  isDirty(): boolean {
    return (
      (this.basicDetailsComponent && !!this.basicDetailsComponent.componentName) ||
      (this.basicDetailsComponent && !!this.basicDetailsComponent.selectedUifGroupItem) ||
      (this.addTemplateComponent && this.addTemplateComponent.isValid)
    ) ? true : false;
  }

  getValidationErrorMessage(basicDetails: boolean, addTemplate: boolean, configEditor: boolean): string {
    const error1 = 'Basic Details';
    const error2 = 'Template Details';
    const error3 = 'Component Config Details';
    const allValidationMessages = [];
    if (!basicDetails) {
      allValidationMessages.push(error1);
    }
    if (!addTemplate) {
      allValidationMessages.push(error2);
    }
    if (!configEditor) {
      allValidationMessages.push(error3);
    }
    return (!basicDetails || !addTemplate || !configEditor) ? `Provide valid ${allValidationMessages.join(', ')}` : '';
  }
}
