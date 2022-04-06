import {DOCUMENT} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, OnInit, Renderer2} from '@angular/core';
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
  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder, private render: Renderer2) {}

  ngOnInit(): void {
    const doc = this.document.firstElementChild;
    this.themeForm = this.fb.group({
      scheme: ['auto'],
    });

    this.themeForm.valueChanges.subscribe((x) => {
      this.render.setAttribute(doc, 'color-scheme', x.scheme);
    });
  }
}
