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

  logout() {
    this.authService.logout();
  }


}
