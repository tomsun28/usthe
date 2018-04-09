import {Injectable} from '@angular/core';
import {HttpUtil} from '../util/http-util';

@Injectable()
export class RoleService {

  constructor(private httpUtil: HttpUtil) { }

  public getRoles(currentPage: number, pageSize: number) {
    const url = 'role' + '/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }

  public addRole(role: any) {
    const url = 'role';
    return this.httpUtil.post(url, role);
  }

  public updateRole(role: any) {
    const url = 'role';
    return this.httpUtil.put(url, role);
  }

  public deleteRole(roleId: number) {
    const url = 'role' + '/' + roleId;
    return this.httpUtil.delete(url);
  }

  public getApiByRoleId(roleId: number, currentPage: number, pageSize: number) {
    const url = 'role/api' + '/' + roleId + '/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }

  public getApiExtendByRoleId(roleId: number, currentPage: number, pageSize: number) {
    const url = 'role/api' + '/-/' + roleId + '/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }

  public getMenuByRoleId(roleId: number, currentPage: number, pageSize: number) {
    const url = 'role/menu' + '/' + roleId + '/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }

  public getMenuExtendByRoleId(roleId: number, currentPage: number, pageSize: number) {
    const url = 'role/menu' + '/-/' + roleId + '/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }

  public getUserByRoleId(roleId: number, currentPage: number, pageSize: number) {
    const url = 'role/user' + '/' + roleId + '/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }

  public getUserExtendByRoleId(roleId: number, currentPage: number, pageSize: number) {
    const url = 'role/user' + '/-/' + roleId + '/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }
}
