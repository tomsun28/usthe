import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogComponent } from './user-log.component';

describe('UserLogComponent', () => {
  let component: UserLogComponent;
  let fixture: ComponentFixture<UserLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
