import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import gsap from 'gsap';

@Component({
  host: {class: 'c-marquee'},
  selector: 'c-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeComponent implements AfterViewInit {
  @ViewChild('scrollingHeadline') scrollHeadline!: ElementRef;
  constructor(private zone: NgZone) {}

  private initGSAP() {
    const scrollingHeadline = this.scrollHeadline.nativeElement;
    gsap.to(scrollingHeadline, {
      x: '-50%',
      duration: 40,
      ease: 'linear',
      repeat: -1,
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initGSAP();
    });
  }
}
