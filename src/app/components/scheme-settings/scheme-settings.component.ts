import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SchemeService} from 'src/app/services/scheme-service.service';

@Component({
  host: {class: 'c-scheme-settings'},
  selector: 'c-scheme-settings',
  templateUrl: './scheme-settings.component.html',
  styleUrls: ['./scheme-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemeSettingsComponent implements OnInit {
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
  themeForm!: FormGroup;
  colors = ['Brand', 'Accent 1', 'Accent 2', 'Text 1', 'Text 2'];
  @ViewChild('hueSlider', {static: true}) hueSlider!: ElementRef;
  @ViewChild('satSlider', {static: true}) satSlider!: ElementRef;
  @ViewChild('lightSlider', {static: true}) lightSlider!: ElementRef;
  constructor(private fb: FormBuilder, private render: Renderer2, private scheme: SchemeService) {}

  private calcPercent(value: number) {
    const percent = (value / 360) * 100;
    return Number(percent.toFixed(3));
  }

  private setTrackFill(): void {
    const hue = this.themeForm.get('hue')?.value;
    // const sat = this.themeForm.get('saturation')?.value;
    // const light = this.themeForm.get('lightness')?.value;

    this.render.setAttribute(this.hueSlider.nativeElement, 'style', `--track-fill:${this.calcPercent(hue)}%;`);
    // this.render.setAttribute(this.satSlider.nativeElement, 'style', `--track-fill:${sat}%;`);
    // this.render.setAttribute(this.lightSlider.nativeElement, 'style', `--track-fill:${light}%;`);
  }

  ngOnInit(): void {
    const hue = this.scheme.getHue();
    const rootHue = this.scheme.getRootHue();
    this.themeForm = this.fb.group({
      scheme: [this.scheme.getColorScheme()],
      hue: [hue ? hue : rootHue],
      // saturation: [hsl ? hsl[1] : rootHSL[1]],
      // lightness: [hsl ? hsl[2] : rootHSL[2]],
    });
    this.setTrackFill();
    this.themeForm.valueChanges.subscribe((x) => {
      this.scheme.setHue(x.hue);
      this.scheme.setCustomScheme(x.hue);
      this.render.setAttribute(this.hueSlider.nativeElement, 'style', `--track-fill:${this.calcPercent(x.hue)}%;`);
      // this.render.setAttribute(this.satSlider.nativeElement, 'style', `--track-fill:${x.saturation}%;`);
      // this.render.setAttribute(this.lightSlider.nativeElement, 'style', `--track-fill:${x.lightness}%;`);
      switch (true) {
        case x.scheme === 'light':
          this.scheme.selectScheme(x.scheme);
          break;
        case x.scheme === 'dark':
          this.scheme.selectScheme(x.scheme);
          break;
        case x.scheme === 'dim':
          this.scheme.selectScheme(x.scheme);
          break;
        default:
          this.scheme.selectScheme(x.scheme);
      }
    });
  }
}
