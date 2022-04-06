import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SchemeSettingsComponent} from './scheme-settings.component';

describe('SchemeSettingsComponent', () => {
  let component: SchemeSettingsComponent;
  let fixture: ComponentFixture<SchemeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchemeSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
