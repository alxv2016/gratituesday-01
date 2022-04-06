import {AfterViewInit, ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {AppComponent} from 'src/app/app.component';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import {SchemeSettingsComponent} from '../scheme-settings/scheme-settings.component';

@Component({
  host: {class: 'c-header'},
  selector: 'c-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(private bp: BottomPaneService, private inject: Injector) {}

  ngOnInit(): void {}

  openSettings(): void {
    this.bp.createBottomPane(SchemeSettingsComponent);
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bp.getBottomPaneHost(parent.bottomPaneHost.viewContainerRef);
  }
}
