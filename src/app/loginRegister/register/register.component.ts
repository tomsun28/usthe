import { Component, OnInit } from '@angular/core';
import {AlertEnum} from '../../common/alert-enum.enum';
import {RegisterService} from '../../service/register.service';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  msg: string = '默认提示信息';
  alert: AlertEnum = AlertEnum.DANGER;
  uid: string;
  username: string;
  password: string;

  constructor(private registerService: RegisterService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  check() {
    if (!this.uid) {
      this.msg = '用户账号不能为空';
      return false;
    }
    if (!this.username) {
      this.msg = '用户名不能为空';
    }
    if (!this.password) {
      this.msg = '密码不能为空';
      return false;
    }
    return true;
  }

  register() {
    if (!this.check()) {
      return;
    }
    // 获取tokenKey秘钥
    const getToken$ = this.registerService.getTokenKey().subscribe(
      data => {

        if (data.data.tokenKey !== undefined) {
          const tokenKey = data.data.tokenKey;
          getToken$.unsubscribe();
          const register$ = this.registerService.register(this.uid, this.username, this.password, tokenKey).subscribe(
            data2 => {
              // 注册成功返回
              if (data2.meta.code === 2002) {
                this.authService.updateUid(this.uid);
                this.msg = '用户注册成功';
                this.alert = AlertEnum.SUCCESS;
                this.router.navigateByUrl('/login');
              } else {
                this.msg = '用户名密码错误';
                this.alert = AlertEnum.WARNING;
              }
              register$.unsubscribe();
            },
            error => {
              this.alert = AlertEnum.DANGER;
              this.msg = '服务器开小差啦';
              register$.unsubscribe();
            }
          );
        }
      }
    );

  }

  reloadAlertMsg(_msg: string) {
    this.msg = _msg;
  }

}
