import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertEnum} from '../../common/alert-enum.enum';
import {LoginService} from '../../service/login.service';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  msg: string = '默认提示信息';
  alert: AlertEnum = AlertEnum.DANGER;

  appId: string;
  password: string;

  isDisabled: boolean = false;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    document.getElementsByTagName('body')[0].classList.add('login-page');
  }

  ngOnDestroy(): void {
    document.getElementsByTagName('body')[0].classList.remove('login-page');
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
    const getToken$ = this.loginService.getTokenKey().subscribe(
      data => {
        if (data.data.tokenKey !== undefined) {
          const tokenKey = data.data.tokenKey;
          const userKey = data.data.userKey;
          getToken$.unsubscribe();
          const login$ = this.loginService.login(this.appId, this.password, tokenKey, userKey).subscribe(
            data2 => {
              // 认证成功返回jwt
              if (data2.meta.code === 1003 && data2.data.jwt != null) {
                this.authService.updateAuthorizationToken(data2.data.jwt);
                this.authService.updateUid(this.appId);
                this.authService.updateUser(data2.data.user);
                login$.unsubscribe();
                this.router.navigateByUrl('/index');
              } else {
                this.msg = '用户名密码错误';
                this.alert = AlertEnum.DANGER;
                this.isDisabled = false;
                login$.unsubscribe();
              }
            },
            error => {
              console.error(error);
              login$.unsubscribe();
              this.msg = '服务器开小差啦';
              this.alert = AlertEnum.DANGER;
              this.isDisabled = false;
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
