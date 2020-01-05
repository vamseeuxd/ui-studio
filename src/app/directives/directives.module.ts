import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DraggableDirective} from './draggable/draggable.directive';


@NgModule({
  declarations: [
    DraggableDirective
  ],
  exports: [
    DraggableDirective
  ],
  imports: [
    CommonModule,
  ]
})
export class DirectivesModule {
}
