import {Injectable} from '@angular/core';
import {HttpUtil} from '../util/http-util';
import * as CryptoJS from 'crypto-js';
import {of} from 'rxjs/observable/of';
import {ErrorObserver} from 'rxjs/Observer';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class LoginService {


  constructor(private httpUtil: HttpUtil) {
  }

  getTokenKey() {
    const url = 'account/login?tokenKey=get';
    // 先向后台申请加密tokenKey tokenKey=get
    return this.httpUtil.get(url);
  }

  login(appId: string, password: string, tokenKey: string, userKey: string) {
    const url = 'account/login';
    tokenKey = CryptoJS.enc.Utf8.parse(tokenKey);
    password = CryptoJS.enc.Utf8.parse(password);
    // AES CBC加密模式
    password = CryptoJS.AES.encrypt(password, tokenKey, {iv: tokenKey, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString();
    console.log(password);
    const param = new HttpParams().append('appId', appId)
      .append('password', password)
      .append('methodName', 'login')
      .append('userKey', userKey)
      .append('timestamp', new Date().toUTCString());

    const body = {
      'appId': appId,
      'password': password,
      'methodName': 'login',
      'userKey': userKey,
      'timestamp': new Date().toUTCString()
    };

    return this.httpUtil.post(url, body);
  }

  logout() {
    const url = 'user/exit';
    return this.httpUtil.post(url);
  }
}
