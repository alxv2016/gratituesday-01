import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarqueeComponent} from './marquee/marquee.component';
import {WelcomeComponent} from './welcome/welcome.component';

@NgModule({
  declarations: [MarqueeComponent, WelcomeComponent],
  imports: [CommonModule],
  exports: [MarqueeComponent, WelcomeComponent],
})
export class ComponentsModule {}
