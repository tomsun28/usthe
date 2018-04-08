import {Component, OnInit} from '@angular/core';
import {AlertEnum} from '../../common/alert-enum.enum';
import {LoginService} from '../../service/login.service';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {ResponseVO} from '../../pojo/ResponseVO';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  msg: string = '默认提示信息';
  alert: AlertEnum = AlertEnum.DANGER;

  appId: string;
  password: string;

  isDisabled: boolean = false;

  responseData: ResponseVO;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  check() {
    if (!this.appId) {
      this.msg = '用户名不能为空';
      return false;
    }
    if (!this.password) {
      this.msg = '密码不能为空';
      return false;
    }
    return true;
  }

  login() {
    if (!this.check()) {
      return;
    }
    this.isDisabled = true;
    // 获取tokenKey秘钥
    this.loginService.getTokenKey().subscribe(
      data => {
        this.responseData = data;
        if (this.responseData.data.tokenKey !== undefined) {
          const tokenKey = this.responseData.data.tokenKey;
          this.loginService.login(this.appId, this.password, tokenKey).subscribe(
            data2 => {
              // 认证成功返回jwt
              this.responseData = data2;
              if (this.responseData.meta.code === 1003 && this.responseData.data.jwt != null) {
                this.authService.updateAuthorizationToken(this.responseData.data.jwt);
                this.authService.updateUid(this.appId);
                this.authService.updateUser(this.responseData.data.user);
                this.router.navigateByUrl('/index');
              } else {
                this.msg = '用户名密码错误';
                this.isDisabled = true;

              }
            },
            error => {
              console.error(error);
              this.msg = error;
              this.isDisabled = true;
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
