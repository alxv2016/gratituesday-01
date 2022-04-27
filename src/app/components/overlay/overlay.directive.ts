import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[overlayHost]',
})
export class OverlayDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
