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
    // const hsl = `${Math.floor(gsap.utils.random(0, 360))}, 95%, 75%`;
    // this.render.setProperty(this.document.querySelector('body'), 'style', `--background: ${hsl}`);
    // this.detectCustomeScheme();
  }
}
