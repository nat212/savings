import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStartupComponent } from './first-startup.component';

describe('FirstStartupComponent', () => {
  let component: FirstStartupComponent;
  let fixture: ComponentFixture<FirstStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstStartupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
