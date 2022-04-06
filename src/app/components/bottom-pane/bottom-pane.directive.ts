import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[bottomPaneHost]',
})
export class BottomPaneDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
