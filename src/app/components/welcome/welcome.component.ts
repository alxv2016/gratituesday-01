import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OverlayService} from '../overlay/overlay.service';

@Component({
  host: {class: 'c-welcome'},
  selector: 'c-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy {
  welcomeForm!: FormGroup;
  eventHandlers: any[] = [];
  transitionEventHandler: any;
  constructor(
    private fb: FormBuilder,
    private render: Renderer2,
    private element: ElementRef,
    private overlay: OverlayService
  ) {
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  private onTransitionEnd(ev: TransitionEvent) {
    const input = this.element.nativeElement.querySelector('input');
    requestAnimationFrame(() => {
      this.render.removeClass(input, 'error');
      this.transitionEventHandler();
    });
  }

  ngOnInit(): void {
    this.welcomeForm = this.fb.group({
      name: [''],
    });

    this.welcomeForm.valueChanges.subscribe((v) => {
      console.log(v);
    });
  }

  submitForm(value: any): void {
    const input = this.element.nativeElement.querySelector('input');
    console.log('enter', value.name.length);
    if (value.name.length === 0) {
      requestAnimationFrame(() => {
        this.render.addClass(input, 'error');
        this.transitionEventHandler = this.render.listen(input, 'animationend', this.onTransitionEnd);
      });
    }
  }

  ngAfterViewInit(): void {
    const input = this.element.nativeElement.querySelector('input');
    const label = this.element.nativeElement.querySelector('label');
    console.log(input);
    this.eventHandlers.push(
      this.render.listen(input, 'focus', (e) => {
        this.render.setStyle(label, 'transform', 'translateY(-80px)');
      }),
      this.render.listen(input, 'blur', (e) => {
        if (e.currentTarget.value.length <= 0) {
          this.render.removeStyle(label, 'transform');
        }
      })
    );
    console.log(this.eventHandlers);
  }

  ngOnDestroy(): void {
    this.eventHandlers.forEach((fn) => fn());
  }
}
