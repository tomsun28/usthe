import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestApiManageComponent } from './rest-api-manage.component';

describe('RestApiManageComponent', () => {
  let component: RestApiManageComponent;
  let fixture: ComponentFixture<RestApiManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestApiManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestApiManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
