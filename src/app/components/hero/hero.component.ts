import {ChangeDetectionStrategy, Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {fromEvent, map, Observable, throttleTime} from 'rxjs';
import {gsap} from 'gsap';

@Component({
  host: {class: 'c-hero'},
  selector: 'c-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit {
  constructor(private element: ElementRef, private zone: NgZone) {}

  private mouseEvent(): Observable<any> {
    return fromEvent<MouseEvent>(window, 'mousemove').pipe(
      throttleTime(60),
      map((ev) => {
        return {x: ev.clientX, y: ev.clientY};
      })
    );
  }

  private animateAbstract(lines: any, pos: any) {
    const hypo = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
    const angle = Math.atan2(pos.x, pos.y);
    const x = Math.sin(angle) * hypo;
    const y = Math.cos(angle) * hypo;

    gsap.to(lines, {
      strokeDashoffset: x / 2 - y / 2,
      stagger: {
        from: 'end',
        each: 0.025,
      },
      ease: 'power4.out',
    });
  }

  private applyLineStrokes() {
    const lines = this.element.nativeElement.querySelectorAll('.abstract > line');
    if (lines) {
      gsap.set(lines, {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeWidth: (i) => i / 2,
      });
    }
    return {
      lines,
    };
  }

  ngOnInit(): void {
    const abstract = this.applyLineStrokes();
    // run outside of angular's change detection
    this.zone.runOutsideAngular(() => {
      this.mouseEvent().subscribe((m) => {
        this.animateAbstract(abstract.lines, m);
      });
    });
  }
}
