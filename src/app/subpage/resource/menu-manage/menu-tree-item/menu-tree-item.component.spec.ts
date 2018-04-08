import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTreeItemComponent } from './menu-tree-item.component';

describe('MenuTreeItemComponent', () => {
  let component: MenuTreeItemComponent;
  let fixture: ComponentFixture<MenuTreeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTreeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
