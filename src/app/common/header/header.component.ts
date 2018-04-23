import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {UserVO} from '../../pojo/UserVO';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  leftSideBar: boolean = true;
  rightSideBar: boolean = false;
  user: UserVO;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLogin();
    this.user = this.authService.getUser();
  }

  dropDownLeftToggle() {
    this.leftSideBar = !this.leftSideBar;
    if (this.leftSideBar) {
      document.getElementsByTagName('body').item(0).classList.remove('sidebar-collapse');  // 'sidebar-collapse'
    } else {

      document.getElementsByTagName('body').item(0).classList.add('sidebar-collapse');   // 'sidebar-open' 'sidebar-collapse'
    }

  }

  dropDownRightToggle() {
    this.rightSideBar = !this.rightSideBar;
    if (this.rightSideBar) {
      document.getElementsByClassName('control-sidebar').item(0).classList.remove('control-sidebar-open');
    } else {
      document.getElementsByClassName('control-sidebar').item(0).classList.add('control-sidebar-open');
    }
  }

}
