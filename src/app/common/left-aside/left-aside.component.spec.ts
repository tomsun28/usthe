import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftAsideComponent } from './left-aside.component';

describe('LeftAsideComponent', () => {
  let component: LeftAsideComponent;
  let fixture: ComponentFixture<LeftAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
