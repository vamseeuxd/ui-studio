import {Component, HostBinding} from '@angular/core';
import {UifComponentCreatorService} from '../../../services/uif-component-creator/uif-component-creator.service';

@Component({
    selector: 'ui-studio-uif-component-add-template',
    templateUrl: './uif-component-add-template.component.html',
    styleUrls: ['./uif-component-add-template.component.scss']
})
export class UifComponentAddTemplateComponent {

    @HostBinding('class') className = 'p-3 col-12 border border-top-0';
    showCodePreview = false;
    htmlTemplate = ``;
    newHtmlText = ``;

    // noinspection JSUnusedGlobalSymbols
    get isValid(): boolean {
        return this.showCodePreview;
    }

    constructor(public service: UifComponentCreatorService) {
        this.service.htmlTemplate$.subscribe(value => {
            this.htmlTemplate = value;
            if (this.htmlTemplate.trim().length > 0) {
                this.showCodePreview = true;
            } else {
                this.showCodePreview = false;
            }
        });
    }

    saveAndPreviewClick() {
        this.service.updateHtmlTemplate(this.newHtmlText);
        this.newHtmlText = '';
    }

}
