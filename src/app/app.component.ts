import {DOCUMENT} from '@angular/common';
import {AfterViewInit, Component, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BottomPaneDirective} from './components/bottom-pane/bottom-pane.directive';
import {SchemeService} from './services/scheme-service.service';

@Component({
  host: {
    class: 'c-root',
  },
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'adaptive-color-scheme';
  colorScheme = [
    {
      name: 'scheme',
      value: 'auto',
      label: 'Auto',
    },
    {
      name: 'scheme',
      value: 'light',
      label: 'Light',
    },
    {
      name: 'scheme',
      value: 'dark',
      label: 'Dark',
    },
    {
      name: 'scheme',
      value: 'dim',
      label: 'Dim',
    },
  ];
  swatches = ['Brand', 'Accent 1', 'Accent 2', 'Text Color 1', 'Text Color 2', 'Success', 'Warning', 'Danger'];
  surfaces = ['Surface 1', 'Surface 2', 'Surface 3', 'Surface 4', 'Surface 5', 'Surface 6'];
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private render: Renderer2,
    private scheme: SchemeService
  ) {}

  private detectCustomeScheme(): void {
    const doc = this.document.firstElementChild;
    const hsl = this.scheme.getHSL();
    if (hsl) {
      this.render.setAttribute(
        doc,
        'style',
        `--brand-hue:${hsl[0]}; --brand-saturation:${hsl[1]}%; --brand-lightness:${hsl[2]}%`
      );
    }
  }

  ngOnInit(): void {
    this.detectCustomeScheme();
  }

  ngAfterViewInit(): void {}
}
