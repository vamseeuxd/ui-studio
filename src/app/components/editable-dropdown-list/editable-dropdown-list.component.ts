import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'ui-studio-editable-dropdown-list',
    templateUrl: './editable-dropdown-list.component.html',
    styleUrls: ['./editable-dropdown-list.component.scss']
})
export class EditableDropdownListComponent implements OnInit {

    @Input() newItemPlaceholder = 'Enter New Group Name';
    @Input() newItemInfo = 'Group Name should be more than 3 characters and unique';
    @Input() duplicateItemError = 'Duplicate Group Name! provide unique Group Name.';
    @Input() minLength = 3;
    @Input() showMoveArrows = true;
    @Input() dataSource: { data: any[], idField: string, labelField: string } = {data: [], idField: 'id', labelField: 'label'};
    @Input() isOpen = false;
    @Input() isAsync = false;
    @Input() selectedItem: any;
    @Input() editingItem: any;
    @Input() newItemName = '';

    @Output() dataSourceChange: EventEmitter<{ data: any[], idField: string, labelField: string }> = new EventEmitter<{ data: any[], idField: string, labelField: string }>();
    @Output() add: EventEmitter<string> = new EventEmitter<string>();
    @Output() newItemNameChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() remove: EventEmitter<any> = new EventEmitter<any>();
    @Output() edit: EventEmitter<{ item: any, [key: string]: string }> = new EventEmitter<{ item: any, [key: string]: string }>();
    @Output() moveUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() moveDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() editingItemChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();


    constructor() {
        for (let i = 0; i < 10; i++) {
            this.dataSource.data.push({id: 'test' + i, label: 'Test ' + i});
        }
    }

    ngOnInit() {
    }

    addItem(newItemInput: HTMLInputElement) {
        if (this.isValidItemNameLength(newItemInput) && !this.isDuplicateItemName(newItemInput)) {
            if (this.isAsync) {
                this.add.emit(newItemInput.value.trim());
            } else {
                const item = {};
                item[this.dataSource.idField] = new Date().getTime().toString();
                item[this.dataSource.labelField] = newItemInput.value.trim();
                this.dataSource.data.push(item);
                newItemInput.value = '';
                this.dataSourceChange.emit(this.dataSource);
            }
        }
    }

    updateSelectedItem($event, option: any) {
        if (!this.editingItem) {
            this.selectedItem = option;
            this.selectedItemChange.emit(this.selectedItem);
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        } else {
            $event.stopPropagation();
        }
    }

    deleteItem($event: MouseEvent, option: any) {
        $event.stopPropagation();
        if (this.isAsync) {
            this.remove.emit(option);
        } else {
            const isConfirmed = confirm('Are you sure! do you want to delete?');
            if (isConfirmed) {
                this.dataSource.data = this.dataSource.data.filter(data => (data[this.dataSource.idField] !== option[this.dataSource.idField]));
                this.dataSourceChange.emit(this.dataSource);
            }
        }
    }

    editItem($event, option: any) {
        $event.stopPropagation();
        this.editingItem = option;
        this.editingItemChange.emit(this.editingItem);
    }

    isEditableOption(option: any): boolean {
        return this.editingItem ? (this.editingItem[this.dataSource.idField] === option[this.dataSource.idField]) : false;
    }

    isValidItemNameLength(editItemInput: HTMLInputElement): boolean {
        return editItemInput.value.trim().length >= this.minLength;
    }

    isDuplicateItemName(editItemInput: HTMLInputElement, option: any = null): boolean {
        if (option) {
            const duplicateItems = this.dataSource.data.filter(data => (data[this.dataSource.idField] !== option[this.dataSource.idField]))
                .filter(data => (data[this.dataSource.labelField].trim().toLowerCase() === editItemInput.value.trim().toLowerCase()));
            return duplicateItems.length > 0;
        } else {
            const duplicateItems = this.dataSource.data.filter(data => (data[this.dataSource.labelField].trim().toLowerCase() === editItemInput.value.trim().toLowerCase()));
            return duplicateItems.length > 0;
        }
    }

    isNewAndExistingNameNotSame(editItemInput: HTMLInputElement, option: any): boolean {
        return (option[this.dataSource.labelField] !== editItemInput.value.trim());
    }

    updateExistingItem(option: any, editItemInput: HTMLInputElement) {
        if (this.isValidItemNameLength(editItemInput) && !this.isDuplicateItemName(editItemInput, option)) {

            if (this.isAsync) {
                const emitValue = {item: option};
                emitValue[this.dataSource.labelField] = editItemInput.value.trim();
                this.edit.emit(emitValue);
            } else {
                this.dataSource.data = this.dataSource.data.map(data => {
                    if (data[this.dataSource.idField] === option[this.dataSource.idField]) {
                        data[this.dataSource.labelField] = editItemInput.value.trim();
                        return data;
                    } else {
                        return data;
                    }
                });
                this.dataSourceChange.emit(this.dataSource);
                this.editingItem = null;
                this.editingItemChange.emit(this.editingItem);
            }
        }
    }

    isItemActive(option: any) {
        // return this.editingUifGroupItem ? false : (this.selectedUifGroupItem ? (this.selectedUifGroupItem[this.dataSource.idField] === option[this.dataSource.idField]) : false);
        return this.selectedItem ? (this.selectedItem[this.dataSource.idField] === option[this.dataSource.idField]) : false;
    }

    resetOnClose() {
        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
        this.editingItem = null;
        this.editingItemChange.emit(this.editingItem);
    }

    moveItemUp($event, index: number) {
        $event.stopPropagation();
        if (this.isAsync) {
            this.moveUp.emit(this.dataSource.data[index]);
        } else {
            this.dataSource.data.splice(
                index - 1,
                0,
                this.dataSource.data.splice(index, 1)[0]
            );
            this.dataSourceChange.emit(this.dataSource);
        }

    }

    moveItemDown($event, index: number) {
        $event.stopPropagation();
        if (this.isAsync) {
            this.moveDown.emit(this.dataSource.data[index]);
        } else {
            this.dataSource.data.splice(
                index + 1,
                0,
                this.dataSource.data.splice(index, 1)[0]
            );
            this.dataSourceChange.emit(this.dataSource);
        }
    }

    logMe(mainDropDown: HTMLDivElement) {
        console.log(mainDropDown);
    }
}
