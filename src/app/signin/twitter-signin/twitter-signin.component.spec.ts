import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterSigninComponent } from './twitter-signin.component';

describe('TwitterSigninComponent', () => {
  let component: TwitterSigninComponent;
  let fixture: ComponentFixture<TwitterSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
