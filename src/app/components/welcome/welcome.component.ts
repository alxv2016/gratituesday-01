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
import {OverlayService} from '../overlay/overlay.service';

@Component({
  host: {class: 'c-welcome'},
  selector: 'c-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  welcomeForm!: FormGroup;
  constructor(private fb: FormBuilder, private render: Renderer2, private overlay: OverlayService) {}

  ngOnInit(): void {
    this.welcomeForm = this.fb.group({
      name: [''],
    });

    this.welcomeForm.valueChanges.subscribe((v) => {
      console.log(v);
    });
  }
}
