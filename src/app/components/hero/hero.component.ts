import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  host: {class: 'c-hero'},
  selector: 'c-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
