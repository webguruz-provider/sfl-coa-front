import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SflteamComponent } from './sflteam.component';

describe('SflteamComponent', () => {
  let component: SflteamComponent;
  let fixture: ComponentFixture<SflteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SflteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SflteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
