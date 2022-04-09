import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {BottomPaneModule} from './bottom-pane/bottom-pane.module';
import {SchemeSettingsComponent} from './scheme-settings/scheme-settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeroComponent} from './hero/hero.component';

@NgModule({
  declarations: [HeaderComponent, SchemeSettingsComponent, HeroComponent],
  imports: [CommonModule, BottomPaneModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, SchemeSettingsComponent, HeroComponent],
})
export class ComponentsModule {}
