import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-tree-item',
  templateUrl: './menu-tree-item.component.html',
  styleUrls: ['./menu-tree-item.component.css']
})
export class MenuTreeItemComponent implements OnInit {

  @Input()
  menu: any;

  @Output()
  selectedMenu: any = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }
  changeMenuStatus(menu: any) {
    menu.isOpen = !menu.isOpen;
    this.focusOnThis(menu);
  }

  focusOnThis(menu: any) {
    this.selectedMenu.emit(menu);
  }

}
