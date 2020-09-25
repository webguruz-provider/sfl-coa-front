import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinSigninComponent } from './linkedin-signin.component';

describe('LinkedinSigninComponent', () => {
  let component: LinkedinSigninComponent;
  let fixture: ComponentFixture<LinkedinSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedinSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
