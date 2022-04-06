import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {BottomPaneModule} from './bottom-pane/bottom-pane.module';
import {SchemeSettingsComponent} from './scheme-settings/scheme-settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, SchemeSettingsComponent],
  imports: [CommonModule, BottomPaneModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, SchemeSettingsComponent],
})
export class ComponentsModule {}
