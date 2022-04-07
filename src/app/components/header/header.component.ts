import {AfterViewInit, ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {AppComponent} from 'src/app/app.component';
import {SchemeService} from 'src/app/services/scheme-service.service';
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
  constructor(private bp: BottomPaneService, private inject: Injector, private scheme: SchemeService) {}

  ngOnInit(): void {
    this.scheme.schemeState$.subscribe();
  }

  openSettings(): void {
    this.bp.createBottomPane(SchemeSettingsComponent, 'Settings');
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bp.getBottomPaneHost(parent.bottomPaneHost.viewContainerRef);
  }
}
