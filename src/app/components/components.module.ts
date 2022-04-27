import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarqueeComponent} from './marquee/marquee.component';

@NgModule({
  declarations: [MarqueeComponent],
  imports: [CommonModule],
  exports: [MarqueeComponent],
})
export class ComponentsModule {}
