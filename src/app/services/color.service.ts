import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  private randomHue(): number {
    return Math.floor(gsap.utils.random(0, 360));
  }

  generateHue(): void {
    const randomHue = this.randomHue();
    const html = this.document.querySelector('html');
    const root = this.document.querySelector('.c-root') as HTMLElement;
    html?.style.setProperty('--brand-hue', `${randomHue}`);
    root?.style.setProperty('--brand-hue', `${randomHue}`);
  }
}
