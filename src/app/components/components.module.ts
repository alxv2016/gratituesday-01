import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarqueeComponent} from './marquee/marquee.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [MarqueeComponent, WelcomeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MarqueeComponent, WelcomeComponent],
})
export class ComponentsModule {}
