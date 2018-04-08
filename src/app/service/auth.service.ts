import { Injectable } from '@angular/core';
import {UserVO} from '../pojo/UserVO';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  public checkLogin(): void {
    const user = this.getUser();
    const userId = user != null ? user.uid : null;
    const uid = this.getUid();
    const jwt = this.getAuthorizationToken();
    if (userId == null
      || uid == null
      || jwt == null
      || userId !== uid) {
      this.router.navigateByUrl('/');
    }

  }

  public logout(): void {
    localStorage.clear();
    // 之后实现通知服务器用户下线

    this.router.navigateByUrl('/');
  }


  public getAuthorizationToken(): string {
    const jwt = localStorage.getItem('Authorization');
    return jwt != null ? jwt : null;
  }

  public updateAuthorizationToken(jwt: string): void {
    localStorage.setItem('Authorization', jwt);
  }

  public updateUser(user: any): void {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem('userInfo');
    return user != null ? JSON.parse(user) : null;
  }

  public getUid(): string {
    const uid = localStorage.getItem('uid');
    return uid != null ? uid : null;
  }

  public updateUid(uid: string): void {
    localStorage.setItem('uid', uid);
  }

  public updateMenuTree(menuTree: any[]): void {

    sessionStorage.setItem('menuTree', JSON.stringify(menuTree));

  }

  public getMenuTree(): any[] {
    const menuTree = sessionStorage.getItem('menuTree');
    return menuTree != null ? JSON.parse(menuTree) : null;
  }

}
