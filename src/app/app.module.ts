import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RoutingModule} from './router/router.module';
import {LoginModule} from './loginRegister/login/login.module';
import {RegisterModule} from './loginRegister/register/register.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpInterceptorProviders} from './interceptor/http-interceptor-providers';
import {HttpUtil} from './util/http-util';
import {AppConfig} from './util/app-config';
import {AuthService} from './service/auth.service';
import {IndexModule} from './index/index.module';
import {LoginService} from './service/login.service';
import {RegisterService} from './service/register.service';
import {ResourceService} from './service/resource.service';
import {RoleService} from './service/role.service';
import {LogService} from './service/log.service';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    RegisterModule,
    IndexModule,
    RoutingModule,
  ],
  providers: [
    HttpUtil,
    AuthService,
    HttpInterceptorProviders,
    AppConfig,
    LoginService,
    RegisterService,
    ResourceService,
    RoleService,
    LogService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
