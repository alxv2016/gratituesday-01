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
export class AppComponent implements OnInit {
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
  brandColors = ['Brand', 'Accent 1', 'Accent 2'];
  textColors = ['Text 1', 'Text 2'];
  semanticColors = ['Success', 'Warning', 'Error'];
  surfaces = ['Surface 1', 'Surface 2', 'Surface 3', 'Surface 4', 'Surface 5', 'Surface 6'];
  elevations = ['Elevation 1', 'Elevation 2', 'Elevation 3', 'Elevation 4'];
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  constructor(private fb: FormBuilder, private scheme: SchemeService) {}

  private detectCustomeScheme(): void {
    const hue = this.scheme.getHue();
    if (hue) {
      this.scheme.setCustomScheme(hue);
    }
  }

  ngOnInit(): void {
    this.detectCustomeScheme();
  }
}
