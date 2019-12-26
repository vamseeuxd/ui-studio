import {Component, HostBinding} from '@angular/core';
import {UifComponentCreatorService} from '../uif-component-creator.service';
import {combineLatest} from 'rxjs';
import {UifComponentConfigInterface} from '../uif-component-config.interface';

@Component({
    selector: 'ui-studio-uif-component-json-config',
    templateUrl: './uif-component-json-config.component.html',
    styleUrls: ['./uif-component-json-config.component.scss']
})
export class UifComponentJsonConfigComponent {
    @HostBinding('class') className = 'p-3 col-12 border border-top-0';
    componentConfig: UifComponentConfigInterface;

    constructor(public service: UifComponentCreatorService) {

        combineLatest(
            this.service.componentName$,
            this.service.componentGroup$,
            this.service.isResponsive$,
            this.service.defaultResponsiveWidth$,
            this.service.defaultWidthUnit$,
            this.service.defaultWidth$,
            this.service.componentConfig$
        ).subscribe(
            // combineLatest Callback
            value => {
                this.componentConfig = null;
                setTimeout(
                    // SetTimeout Callback
                    () => {
                        this.componentConfig = {
                            componentName: value[0],
                            componentGroup: value[1],
                            isResponsive: value[2],
                            defaultResponsiveWidth: value[3],
                            defaultWidthUnit: value[4],
                            defaultWidth: value[5],
                            ...value[6]
                        };
                        this.componentConfig.componentName = value[0];
                        this.componentConfig.componentGroup = value[1];
                        this.componentConfig.isResponsive = value[2];
                        this.componentConfig.defaultResponsiveWidth = value[3];
                        this.componentConfig.defaultWidthUnit = value[4];
                        this.componentConfig.defaultWidth = value[5];
                    }
                    // --->>>
                );
            }
            // --->>>
        );
    }

}
