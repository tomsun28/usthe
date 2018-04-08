import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../loginRegister/login/login.component';
import {IndexComponent} from '../index/index.component';
import {RegisterComponent} from '../loginRegister/register/register.component';
import {MenuManageComponent} from '../subpage/resource/menu-manage/menu-manage.component';
import {RestApiManageComponent} from '../subpage/resource/rest-api-manage/rest-api-manage.component';

const routes: Routes = [
  // 应用的默认路径,当URL为空时访问,作为应用的起点
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'index', component: IndexComponent, children: [
      { path: '', component: MenuManageComponent },
      { path: 'menu', component: MenuManageComponent },
      { path: 'api', component: RestApiManageComponent },

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
