import {DOCUMENT} from '@angular/common';
import {AfterViewInit, Component, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import gsap from 'gsap';

@Component({
  host: {
    class: 'c-root',
  },
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document, private render: Renderer2) {}

  ngOnInit(): void {
    const randomHue = Math.floor(gsap.utils.random(0, 360));
    this.render.setProperty(this.document.querySelector('html'), 'style', `--brand-hue: ${randomHue}`);
  }
}
