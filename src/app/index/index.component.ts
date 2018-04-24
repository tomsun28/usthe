import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLogin();
    // update the adminLET layouts
    AdminLTE.init();
  }


}
