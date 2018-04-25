import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLogin();

    document.getElementsByTagName('body')[0].classList.add('skin-red');
    document.getElementsByTagName('body')[0].classList.add('sidebar-mini');

    // update the adminLET layouts
    AdminLTE.init();

  }

  ngOnDestroy() {
    document.getElementsByTagName('body')[0].classList.remove('skin-red');
    document.getElementsByTagName('body')[0].classList.remove('sidebar-mini');
  }

}
