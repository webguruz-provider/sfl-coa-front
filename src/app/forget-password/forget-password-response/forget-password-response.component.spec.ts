import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordResponseComponent } from './forget-password-response.component';

describe('ForgetPasswordResponseComponent', () => {
  let component: ForgetPasswordResponseComponent;
  let fixture: ComponentFixture<ForgetPasswordResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
