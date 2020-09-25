import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantTasksComponent } from './important-tasks.component';

describe('ImportantTasksComponent', () => {
  let component: ImportantTasksComponent;
  let fixture: ComponentFixture<ImportantTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
