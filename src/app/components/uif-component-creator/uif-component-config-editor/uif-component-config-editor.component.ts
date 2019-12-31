import {Component, HostBinding} from '@angular/core';
import {UifComponentCreatorService} from '../../../services/uif-component-creator/uif-component-creator.service';
import {UifComponentConfigInterface} from '../uif-component-config.interface';

@Component({
    selector: 'ui-studio-uif-component-config-editor',
    templateUrl: './uif-component-config-editor.component.html',
    styleUrls: ['./uif-component-config-editor.component.scss']
})
export class UifComponentConfigEditorComponent {
    @HostBinding('class') className = 'p-3 col-12 border border-top-0';
    public componentConfig: UifComponentConfigInterface;

    // noinspection JSUnusedGlobalSymbols
    get isValid(): boolean {
        return this.componentConfig ? this.componentConfig.isValid : false;
    }

    constructor(public service: UifComponentCreatorService) {
        this.service.componentConfig$.subscribe(value => (this.componentConfig = value));
    }

    onValueChange(componentConfig) {
        this.service.updateComponentConfig(componentConfig);
    }

}
