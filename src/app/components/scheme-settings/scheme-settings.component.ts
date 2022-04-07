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
  @ViewChild('hueSlider', {static: true}) hueSlider!: ElementRef;
  @ViewChild('satSlider', {static: true}) satSlider!: ElementRef;
  @ViewChild('lightSlider', {static: true}) lightSlider!: ElementRef;
  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder, private render: Renderer2) {}

  private calcPercent(value: number) {
    const percent = (value / 360) * 100;
    return Number(percent.toFixed(3));
  }

  private setTrackFill(): void {
    const hue = this.themeForm.get('hue')?.value;
    const sat = this.themeForm.get('saturation')?.value;
    const light = this.themeForm.get('lightness')?.value;

    this.render.setAttribute(this.hueSlider.nativeElement, 'style', `--track-fill:${this.calcPercent(hue)}%;`);
    this.render.setAttribute(this.satSlider.nativeElement, 'style', `--track-fill:${sat}%;`);
    this.render.setAttribute(this.lightSlider.nativeElement, 'style', `--track-fill:${light}%;`);
  }

  ngOnInit(): void {
    const doc = this.document.firstElementChild;
    this.themeForm = this.fb.group({
      scheme: ['auto'],
      hue: [72],
      saturation: [100],
      lightness: [55],
    });
    this.setTrackFill();
    this.themeForm.valueChanges.subscribe((x) => {
      this.render.setAttribute(doc, 'color-scheme', x.scheme);
      this.render.setAttribute(
        doc,
        'style',
        `--brand-hue:${x.hue}; --brand-saturation:${x.saturation}%; --brand-lightness:${x.lightness}%`
      );
      this.render.setAttribute(this.hueSlider.nativeElement, 'style', `--track-fill:${this.calcPercent(x.hue)}%;`);
      this.render.setAttribute(this.satSlider.nativeElement, 'style', `--track-fill:${x.saturation}%;`);
      this.render.setAttribute(this.lightSlider.nativeElement, 'style', `--track-fill:${x.lightness}%;`);
    });
  }
}
