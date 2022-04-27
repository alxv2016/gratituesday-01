import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayComponent} from './overlay.component';
import {OverlayDirective} from './overlay.directive';

@NgModule({
  declarations: [OverlayComponent, OverlayDirective],
  imports: [CommonModule],
  exports: [OverlayDirective],
})
export class OverlayModule {}
