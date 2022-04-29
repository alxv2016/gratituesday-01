import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  Component,
  DoCheck,
  Inject,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import gsap from 'gsap';
import {OverlayDirective} from './components/overlay/overlay.directive';
import {OverlayService} from './components/overlay/overlay.service';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {ColorService} from './services/color.service';

@Component({
  host: {
    class: 'c-root',
  },
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(OverlayDirective, {static: true}) overlayHost!: OverlayDirective;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2,
    private color: ColorService,
    private overlay: OverlayService
  ) {}
  ngOnInit(): void {
    this.overlay.getBottomPaneHost(this.overlayHost.viewContainerRef);
    this.overlay.createBottomPane(WelcomeComponent);
    this.color.generateHue();
  }
}
