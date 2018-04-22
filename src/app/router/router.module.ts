import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../loginRegister/login/login.component';
import {IndexComponent} from '../index/index.component';
import {RegisterComponent} from '../loginRegister/register/register.component';
import {MenuManageComponent} from '../subpage/resource/menu-manage/menu-manage.component';
import {RestApiManageComponent} from '../subpage/resource/rest-api-manage/rest-api-manage.component';
import {RoleManageComponent} from '../subpage/resource/role-manage/role-manage.component';
import {UserLogComponent} from '../subpage/user/user-log/user-log.component';

const routes: Routes = [
  // 应用的默认路径,当URL为空时访问,作为应用的起点
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'index', component: IndexComponent, children: [
      { path: '', component: UserLogComponent },
      { path: 'menu', component: MenuManageComponent },
      { path: 'api', component: RestApiManageComponent },
      { path: 'role', component: RoleManageComponent },
      { path: 'log', component: UserLogComponent }

    ]},

  // 当所请求的URL不匹配前面定义的路由表中的任何路径时,路由器就会选择此路由
  { path: '**', redirectTo: 'index/404', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
